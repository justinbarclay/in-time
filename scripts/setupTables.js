let config = require("../config.js");
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
    console.log(data);
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
        resolve(data.setup);
    });
}
////////////////////////////////////////////////////////////////////////////////
//
//  Setup Tables
//
////////////////////////////////////////////////////////////////////////////////

///////
// Timesheets
//////
function clearTimesheetTable(data){
    return new Promise(function(resolve, reject){
        let drop = "DROP TABLE IF EXISTS Timesheets";
        data.client.query(drop, function(err, results){
            resolve(data);
        });
    });
}

function clearTimesheetMetaTable(data){
    return new Promise(function(resolve, reject){
        let drop = "DROP TABLE IF EXISTS Timesheets_Meta";
        data.client.query(drop, function(err, results){
            resolve(data);
        });
    });
}

function timesheetTable(data){
     return new Promise(function(resolve, reject){
        let make = "CREATE TABLE IF NOT EXISTS Timesheets(index serial PRIMARY KEY, timesheet_foreignkey varchar(36), row_id varchar(36) UNIQUE, service_description TEXT, service_duration REAL, service_date DATE, delete BOOLEAN)";
        data.client.query(make, function(err, results){
            resolve(data);
        });
    });
}

function timesheetMetaTable(data){

     return new Promise(function(resolve, reject){
        let make = "CREATE TABLE IF NOT EXISTS Timesheets_Meta(index serial PRIMARY KEY, timesheet_id varchar(36) UNIQUE, user_foreignkey INT, start_date DATE, end_date DATE, engagement INT, approved BOOLEAN, delete BOOLEAN)";
        data.client.query(make, function(err, results){
            resolve(data);
        });
    });
}
//////////
// Users
//////////

function clearUsersTable(data){
     return new Promise(function(resolve, reject){
        let drop = "DROP TABLE IF EXISTS Users";
        data.client.query(drop, function(err, results){
            resolve(data);
        });
    });
}

function usersTable(data){
     return new Promise(function(resolve, reject){
        let make ="CREATE TABLE IF NOT EXISTS Users(user_id serial PRIMARY KEY, email varchar(32) UNIQUE, password varchar(64), role TEXT, invite_code varchar(36), invited_on timestamptz, supervisor INTEGER, org_foreignkey INTEGER, last_accessed timestamptz )";
        data.client.query(make, function(err, results){
            resolve(data);
        });
    });
}

/////////
// Owners
/////////

function clearOwnerTable(data){
     return new Promise(function(resolve, reject){
        let drop = "DROP TABLE IF EXISTS organization";
        data.client.query(drop, function(err, results){
            resolve(data);
        });
    });
}

function ownerTable(data){
     return new Promise(function(resolve, reject){
        let make = "CREATE TABLE IF NOT EXISTS organization(index serial PRIMARY KEY, orgname TEXT,  domains TEXT, owner_foreignkey INTEGER )";
        data.client.query(make, function(err, results){
            resolve(data);
        });
    });
}

//////////
// Promises
//////////

function makeTables(data, callback){
    connect(data)
    .then(begin)
    .then(clearTimesheetTable)
    .then(timesheetTable)
    .then(clearTimesheetMetaTable)
    .then(timesheetMetaTable)
    .then(clearUsersTable)
    .then(usersTable)
    .then(clearOwnerTable)
    .then(ownerTable)
    .catch(rollback)
    .then(finish)
    .then(callback);
}

module.exports = makeTables;
