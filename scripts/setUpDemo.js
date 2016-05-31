let owner = require('../app/server/controllers/owner');
let timesheet = require('../app/server/controllers/timesheet');
let bcrypt = require('bcrypt');

let config = require("../config.js");
let secret = config.secret;
let pg = require('pg');
let Client = pg.Client;
let conString = config.postgres;

////////////////////////////////////////////////////////////////////////////////
//
// Database Boilerplate
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
                console.log(data);
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
    return new Promise(function(resolve, reject) {
        data.client.query('ROLLBACK', function(err) {
            data.done();
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
function finish(data) {
    return new Promise(function(resolve, reject) {
        data.client.query('COMMIT', data.done);
        data.done();
        data.message = "Timesheet updated";
        resolve(data);
    });
}
////////////////////////////////////////////////////////////////////////////////
//
// Promises
//
////////////////////////////////////////////////////////////////////////////////
makeDemo = function(data){
    return new Promise(function(resolve, reject){
        let demoOwner = {
            "user":{
                "email": data.owner.email,
                "password":"demo"
            }, "org": {
                "orgname": data.owner.organization,
                "domain": null
            }
        };
        try{
            owner.addOrganization(demoOwner, function(owner){
                console.log(owner);
                data.owner.ownerID = owner.userID;
                data.orgID = owner.orgID;
                resolve(data);
            });
        } catch (err){
            reject(err);
        }
    });
};

function addSupervisors(data){
    return new Promise(function(resolve, reject){
        let supervisors = data.setup.supervisors;
        Promise.all(supervisors.map(function(supervisor) {
            supervisor.orgID = data.setup.orgID;
            return addEmployee(supervisor, data.client);
        }))
        .then(function(result) {
            data.setup.supervisors = result;
            console.log(result);
            resolve({
                setup: data.setup,
                client: data.client,
                done: data.done
            });
        });
    });
}

function addStaff(data){
    console.log("Starting staff");
    return new Promise(function(resolve, reject){
        let staff = data.setup.staff;
        Promise.all(staff.map(function(user) {
                user.orgID = data.setup.orgID;
                console.log("user: " + user.orgID);
                return addEmployee(user, data.client);
        }))
        .then(function(result) {
            console.log("add staff");
            resolve({
                setup: data.setup,
                client: data.client,
                done: data.done
            });
        })
        .catch(reject);
    });
}
function addSupervisorID(data){

    let employees = data.setup.staff;
    let supervisors = data.setup.supervisors;
    employees.map(function(employee){
        for(i=0; i< supervisors.length; i++){
            if(employee.supervisor === supervisors[i].email){
                employee.supervisorID = supervisors[i].id;
            }
        }
        return employee;
    });
    return data;
}
function addEmployee(data, client) {
    let queryString = "INSERT into Users(email, password, org_foreignkey, role, supervisor) VALUES ($1, $2, $3, $4, $5) RETURNING user_id";
    //Asynchronously insert data into the database
    console.log(data);
    let password = bcrypt.hashSync("demo", bcrypt.genSaltSync(4));
    console.log("hashed");
    var employee = [
        data.email, password, data.orgID, data.role, data.supervisorID || null
    ];
    console.log("employee" + employee);
    return new Promise(function(resolve, reject) {
        client.query(queryString, employee, function(err, result) {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                data.id = result.rows[0].user_id;
                resolve(data);
            }
        });
    });
}

function addAllTimesheets(data){
    supervisors = data.setup.supervisors;
    staff = data.setup.staff;
    return new Promise(function(resolve, reject){
        Promise.all(supervisors.map(function(supervisor){
            return addStaffTimesheets(supervisor);
        }))
        .then(function(){
            Promise.all(staff.map(function(single){
                return addStaffTimesheets(single);
            }));
        }).then(resolve(data));
    });
}

function addStaffTimesheets(staff){
    var timesheets;
    if(staff.timesheets){
        timesheets = staff.timesheets;
    } else{
        console.log("fail");
        return;
    }
    return new Promise(function(resolve, reject){
        Promise.all(timesheets.map(function(entry){
            entry.userID = staff.id;
            entry.delete = false;
            timesheet.createTimesheet(entry, function(test){
                resolve(staff);
            });
        }));
    });
}
function demoSetup(data){
makeDemo(data)
.then(connect)
.then(begin)
.then(addSupervisors)
.then(addSupervisorID)
.then(addStaff)
.then(addAllTimesheets)
.catch(rollback)
.then(finish)
.then(callback);
}

module.exports = demoSetup;
