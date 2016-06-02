"use strict";

var config = require("../../../config.js");
var pg = require('pg');
pg.defaults.poolSize = 30;
var conString = config.postgres;
var uuid = require('uuid').v4;
var user = require('./user');

////////////////////////////////////////////////////////////////////////////////
//
//  Boiler Plate for Database interaction
//
////////////////////////////////////////////////////////////////////////////////
let connect = function(data) {
    //Currently unaware of a goodway to pass around the query data, known as data
    //and the client and done objects. I have decidced to attach them to the query
    //itself so that at anypoint in the chain I can call client.query or client.end
    //as well as done()
    return new Promise(function(resolve, reject) {
        pg.connect(conString, function(err, client, done) {
            if (err) {
                throw err;
            } else {
                resolve({
                    setup: data,
                    done: done,
                    client: client
                });
            }
        });
    });
};
function rollback(data) {
    //if there was a problem rolling back the query
    //something is seriously messed up.  Return the error
    //to the done function to close & remove this client from
    //the pool.  If you leave a client in the pool with an unaborted
    //transaction weird, hard to diagnose problems might happen.
    return new Promise(function(resolve, reject){
        data.client.query('ROLLBACK', function(err) {
            if (err) {
                throw err;
            }
            resolve({err: true});
        });
    });

}

function finish(data) {
    return new Promise(function(resolve, reject) {
        data.client.query('COMMIT', data.done);
        resolve({error: null,
                 userID: data.userID,
                 orgID: data.orgID
        });
    });
}

function begin(data) {
    //as long as we do not call the `done` callback we can do
    //whatever we want...the client is ours until we call `done`
    //on the flip side, if you do call `done` before either COMMIT or ROLLBACK
    //what you are doing is returning a client back to the pool while it
    //is in the middle of a transaction.
    //Returning a client while its in the middle of a transaction
    //will lead to weird & hard to diagnose errors.
    return new Promise(function(resolve, reject) {
        data.client.query('BEGIN', function(err) {
            if (err) {
                throw err;
            } else {
                resolve({
                    setup: data.setup,
                    client: data.client,
                    done: data.done
                });
            }
        });
    });
}

///////////////////////////////////////////////////////////////////////////////
//
// Add a new Owner and Organization
//
///////////////////////////////////////////////////////////////////////////////
function addOrganization(data){
    let org = data.setup.org;
    return new Promise(function(resolve, reject){
        var values = [org.orgname, org.domain, 0];
        let queryString =
            "INSERT INTO Organization(orgname, domains, owner_foreignkey) VALUES($1, $2, $3) RETURNING index";
        console.log(values);
        data.client.query(queryString, values, function(err, result){
            if(err){
                console.log("addOrganization");
                console.log(err);
                throw err;
            } else{
                data.setup.org.key = result.rows[0].index;
                resolve({
                    setup: data.setup,
                    client: data.client,
                    done: data.done
                });
            }
        });
    });
}

function createUser(data){
    return new Promise(function(resolve, reject){
        let newuser = data.setup.user;
        user.signUpOwner(newuser.password, newuser.email, data.setup.org.key, function(err, bool, result){
            if (err){
                console.log("createUser");
                reject(data);
            } else {
                resolve({
                    setup: data.setup,
                    client: data.client,
                    done: data.done
                });
            }
        });
    });
}

function updateOwner(data){
    let userEmail = data.setup.user.email;
    let findOwner = "SELECT user_id FROM users WHERE email=$1";
    return new Promise(function(resolve, reject){
        data.client.query(findOwner, [userEmail], function(err, result){
            let userID = result.rows[0].user_id;
            let update = "UPDATE Organization SET owner_foreignkey='" +
            userID + "'WHERE orgname='" + data.setup.org.orgname + "'";
            data.client.query(update, function(err, result){
                console.log(err);
                resolve({
                    setup: data.setup,
                    client: data.client,
                    done: data.done,
                    userID: userID,
                    orgID:data.setup.org.key
                });
            });
        });
    });
}
///////////////////////////////////////////////////////////////////////////////
//
// findStaff
//
//////////////////////////////////////////////////////////////////////////////
function findOrganization(data){
    let ownerID = data.setup.id;
    var findOrg = "SELECT index FROM Organization WHERE organization.owner_foreignkey=$1";
    return new Promise(function(resolve, reject){
        data.client.query(findOrg, [ownerID], function(err, result){
            if(err){
                reject(err);
            } else {
                console.log(err);
                console.log(result);
                if(typeof result.rows !== undefined){
                    try{
                        let orgID = result.rows[0].index;
                        resolve ({
                            setup: data.setup,
                            client: data.client,
                            done: data.done,
                            orgID: orgID
                        });
                    } catch(error){
                        data.done();
                        reject({error:error});
                    }
                } else {
                    data.done();
                    reject("Bad things");
                }
            }
        });
    });
}

function getEmployees(data){
    let orgID = data.orgID;
    let getUsers = "SELECT users1.email, users1.role, users2.email as supervisor FROM public.users as users1 LEFT OUTER JOIN public.users as users2 ON users1.supervisor = users2.user_id AND users1.org_foreignkey = $1";
    return new Promise(function(resolve, reject){
        try{
            data.client.query(getUsers, [orgID], function(err, result){
                if(err){
                    data.done();
                    reject({
                        err:err
                    });
                } else{
                    let staff = result.rows.map(function(data){
                        return {role: data.role, email: data.email, supervisor: data.supervisor};
                    });
                    data.client.query('COMMIT', data.done);
                    data.done();
                    resolve({
                        message: "Success",
                        data: staff
                    });
                }
            });
        } catch (error){
            data.done();
            reject({error:error});
        }
    });
}


function getStaff(data){
    let supervisorID = data.setup.id;
    console.log(data.setup.id);
    let getUsers = "SELECT email, role, user_id FROM Users WHERE supervisor = $1";
    return new Promise(function(resolve, reject){
        try{
            data.client.query(getUsers, [supervisorID], function(err, result){
                if(err){
                    console.log(err);
                    data.done();
                    reject({
                        err:err
                    });
                } else{
                    let staff = result.rows.map(function(data){
                        console.log(data);
                        return {role: data.role, email: data.email, id: data.user_id};
                    });
                    data.client.query('COMMIT', data.done);
                    data.done();
                    resolve({
                        message: "Success",
                        data: staff
                    });
                }
            });
        } catch (error){
            data.done();
            reject({error:error});
        }
    });
}
///////////////////////////////////////////////////////////////////////////////
//
// api Calls
//
///////////////////////////////////////////////////////////////////////////////
function addOrganizationPromise(data, callback) {
    connect(data)
        .then(begin)
        .then(addOrganization)
        .then(createUser)
        .then(updateOwner)
        .then(finish)
        .catch(rollback)
        .then(callback);
}
function getAllEmployeesPromise(data, callback){
    connect(data)
        .then(findOrganization)
        .then(getEmployees)
        .catch(function(err){
            console.log("Error getting employees");
            return({err:true, message: "Error getting employees"});
        })
        .then(callback);
}

function getEmployeesPromise(data, callback){
    connect(data)
    .then(getStaff)
    .catch(function(err){
        console.log("Error getting supervisors staff");
        return({err: true, message: "Error getting staff"});
    })
    .then(callback);
}

exports.addOrganization = addOrganizationPromise;
exports.getAllEmployees = getAllEmployeesPromise;
exports.getEmployees = getEmployeesPromise;
