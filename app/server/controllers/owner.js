"use strict";

var config = require("../../../config.js");
var pg = require('pg');
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
    console.log("finish");
    return new Promise(function(resolve, reject) {
        data.client.query('COMMIT', data.done);
        data.done();
        data.client.end();
        console.log("data", data);
        resolve({
            setup: data.setup,
            client: data.client,
            done: data.done
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
function addOrganization(data){
    console.log("Call");
    let queryString =
        "INSERT INTO Organization (orgname, domain) VALUES($1, $2)";
    let org = data.setup.org;
    return new Promise(function(resolve, reject){
        let values = [org.organization, org.domain];
        data.client.query(queryString, values, function(err, result){
            if(err){
                throw err;
            } else{
                console.log(result.rows);
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
        user.signUp(newuser.password, newuser.email, function(err, bool, result){
            if (err){
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

function updateOwner(data){
    let userEmail = data.user.email;
    let findOwner = "SELECT user_id FROM userlogin WHERE email=" + "'" +
        userEmail + "'";
    return new Promise(function(resolve, reject){
        data.client.query(findOwner, function(err, result){
            console.log(result.rows[0]);
            let update = "UPDATE Organization SET admin_foreignkey='" +
            result.rows[0].user_id + "'WHERE org =''" + data.setup.org.organization + "'";
            data.client.query(update, function(err, result){
                resolve({
                    setup: data.setup,
                    client: data.client,
                    done: data.done
                });
            });
        });
    });
}
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

exports.addOrganization = addOrganizationPromise;
