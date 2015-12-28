"use strict";

let config = require("../../../config.js");
let pg = require('pg');
let conString = config.postgres;
let uuid = require('uuid')
    .v4;
let fs = require('fs');


//Lowers timeout time, to close client connection sooner, this may cause problems
//in the long run as queries to the database take a longer time
//but for now, while running tests this needs to be short

//without this being set pg.defaults to 30 clients running and a timeout time for
//each client of 30s (30000)
pg.defaults.poolIdleTimeout = 10 * 1000;
////////////////////////////////////////////////////////////////////////////////
//
//Timesheet Controller
//
////////////////////////////////////////////////////////////////////////////////
// Handles interaction with Timesheets and Timesheet_Meta tables in the database
/* Data Structure
*Table: Timesheet
{
    "index": "primary serial"
    "timesheet_foreignkey": "probably some UUID number",
    "service_date:" "date of service",
    "service_duration": "duration of service",
    "service_description": "description of service",
}
*Table: Timesheets_Meta
{
    "timesheet_id": "UUID.v4()",
    "user_foreignkey": "foreign key ID for user, should that be DB generated or generated by the application?",
    "start_date": "dd/mm/yyyy",
    "end_date": "dd/mm/yyyy",
    "engagement_number": "foreign key ID of customer"
    "row_id": "serial_id"

}
*/
//May want to look into implementing prepared queires
// as seen at https://github.com/brianc/node-postgres/wiki/Prepared-Statements



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

function error(err) {
    console.error(err);
}

function finish(data) {
    console.log("finish");
    return new Promise(function(resolve, reject) {
        data.client.query('COMMIT', data.done);
        data.done();
        data.client.end();
        // console.log("data", data);
        resolve(data);
    });
}
////////////////////////////////////////////////////////////////////////////////
//
//Promises
//
////////////////////////////////////////////////////////////////////////////////

//I may want to switch, or add streams to this data flow as well. Stream would be
//really useful for the queries that have a for each loop

////////////////////////////////////////////////////////////////////////////////
//Transactional Queries
////////////////////////////////////////////////////////////////////////////////
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

////////////////////////////////////////////////////////////////////////////////
//Insert Queries
////////////////////////////////////////////////////////////////////////////////
let addMetaData = function(data) {
    let meta = data.setup;
    return new Promise(function(resolve, reject) {
        //Asynchronously insert data into the database
        let upsert = `SELECT * FROM upsert_meta('${meta.timesheetID}', ${meta.userID}, '${meta.startDate}', '${meta.endDate}', ${meta.engagement}, ${meta.delete})`;
        console.log(upsert);
        let metaTimesheet = [meta.timesheetID, meta.userID,
            meta.startDate, meta.endDate, meta.engagement, meta.delete
        ];
        data.client.query(upsert, function(err, result) {
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
};

function upsertEntries(data) {
    return new Promise(function(resolve, reject) {
        let entries = data.setup.entries;
        Promise.all(entries.map(function(entry) {
                console.log("entry", entry);
                return upsertEntry({
                    timesheetID: data.setup.timesheetID,
                    rowID: entry.rowID,
                    date: entry.date,
                    duration: entry.duration,
                    service: entry.service,
                    delete: entry.delete
                }, data.client);
            }))
            .then(function(result) {
                console.log("add entries");
                resolve({
                    data: data.setup,
                    result: result,
                    client: data.client,
                    done: data.done
                });
            });
    });
}

function addEntry(data, client) {
    var queryString =
        "INSERT INTO Timesheets (timesheet_foreignkey, row_id, service_duration, service_description, service_date) VALUES($1, $2, $3, $4, $5)";
    //Asynchronously insert data into the database
    var entry = [
        data.timesheetID, data.duration,
        data.service, data.date
    ];
    console.log(entry);
    console.log("made it into here");
    return new Promise(function(resolve, reject) {
        console.log("and here");
        console.log(entry);
        client.query(queryString, entry, function(err, result) {
            console.log("but not here");
            if (err) {
                throw err;
            } else {
                console.log(result);
                console.log(result.rows);
                resolve(result.rows);
            }
        });
    });
}

function upsertEntry(data, client) {
    let upsert = `SELECT * FROM upsert_timesheet('${data.timesheetID}', '${data.rowID}', '${data.service}', ${data.duration}, '${data.date}', ${data.delete})`;
    //Asynchronously insert data into the database
    console.log("made it into here");
    return new Promise(function(resolve, reject) {
        console.log("and here");
        client.query(upsert, function(err, result) {
            console.log("but not here");
            if (err) {
                throw err;
            } else {
                console.log(result);
                console.log(result.rows);
                resolve(result.rows);
            }
        });
    });
}
////////////////////////////////////////////////////////////////////////////////
//Read Data Queries
////////////////////////////////////////////////////////////////////////////////
//Evovling how I think about inputs, moving from timesheets to data
//I am not qure if I like having to access the data I am querying about through
//a property in the function. However, I am not sure of a better way to do this
//while still being able to access client and done properties throughout the
//querying process.
function getTimesheetIDs(data) {
    //grabs a list of user timesheets and passes it on in a callback
    let userID = data.setup.userID;
    console.log("userID: ", userID);
    return new Promise(function(resolve, reject) {
        let queryString =
            "SELECT timesheet_id, engagement, date_part('epoch', start_date)*1000 AS start_date, date_part('epoch', end_date)*1000 AS end_date, delete FROM Timesheets_Meta WHERE delete = 'FALSE' AND user_foreignkey= $1";
        data.client.query(queryString, [userID], function(err, result) {
            if (err) {
                console.error(err);
            } else {
                data.meta = result.rows;
                resolve(data);
            }
        });
    });
}

function getAllEntries(data) {
    return new Promise(function(resolve, reject) {
        Promise.all(data.meta.map(function(meta) {
                return getEntries(meta, data.client);
            }))
            .then(function(entries) {
                data.entries = flatten(entries);
                resolve(data);
            });
    });
}

function getEntries(data, client) {
    let queryString = "SELECT timesheet_foreignkey, index, service_description" +
        ", service_duration, EXTRACT('epoch' from service_date)*1000 AS service_date," +
        " delete FROM timesheets WHERE delete = 'FALSE' AND timesheet_foreignkey" +
        " = $1";
    return new Promise(function(resolve, reject) {
        client.query(queryString, [data.timesheet_id], function(err,
            result) {
            if (err) {
                console.log("this is an err: ", err);
                throw err;
            } else {
                console.log(result.rows);
                resolve(result.rows);
            }
        });
    });
}

////////////////////////////////////////////////////////////////////////////////
//Delete Data
////////////////////////////////////////////////////////////////////////////////
function deleteTimesheetEntries(data) {
    return new Promise(function(resolve, reject) {
        data.delete.forEach(function(index) {
            data.client.query(
                "DELETE FROM Timesheets WHERE timesheet_foreignkey=$1", [
                    index
                ],
                function(err, result) {
                    if (err) {
                        console.error(
                            'error deleting query into timesheet',
                            err);
                        throw err;
                    } else {
                        console.log(
                            "Timesheet succesfully deleted"
                        ); //Debug
                        resolve(data);
                    }
                });
        });
    });
}

function deleteTimesheetMeta(data) {
    return new Promise(function(resolve, reject) {
        data.delete.forEach(function(index) {
            data.client.query(
                "DELETE FROM Timesheets_Meta WHERE timesheet_id=$1", [
                    index
                ],
                function(err, result) {
                    if (err) {
                        console.error(
                            'error deleting query into timesheet',
                            err); //Debug
                        throw err;
                    } else {
                        console.log(
                            "Timesheet succesfully deleted  "
                        ); //Debug
                        resolve(data);
                    }
                });
        });
    });
}

////////////////////////////////////////////////////////////////////////////////
//Composed Queries
////////////////////////////////////////////////////////////////////////////////
function createTimesheet(data, callback) {
    connect(data)
        .then(addMetaData)
        .then(upsertEntries)
        .then(finish)
        .catch(error)
        .then(callback);

}

function getTimesheets(request, callback) {
    connect(request)
        .then(getTimesheetIDs)
        .then(getAllEntries)
        .then(finish)
        .catch(rollback)
        .then(buildTimesheets)
        .then(callback);
    console.log("done getting timesheets");
}

function deleteTimesheets(request, callback) {
    connect(request)
        .then(deleteTimesheetEntries)
        .then(deleteTimesheetMeta)
        .catch(error)
        .then(finish)
        .then(callback);
}
////////////////////////////////////////////////////////////////////////////////
//Helper Functions
////////////////////////////////////////////////////////////////////////////////

// I am unsure if this is the proper way to do this.
// It may be better to have a singular query with a join in it so that I change
// build up the timesheet later
// This is an area for easy optimization
function buildTimesheets(data) {
    return new Promise(function(resolve, reject) {
        console.log("building timesheet");
        console.log(data);
        let meta_info = data.meta;
        let entries = data.entries;
        let timesheets = meta_info.map(function(meta) {
            let timesheet = {
                timesheetID: meta.timesheet_id,
                startDate: buildYearMonthDay(new Date(meta.start_date)),
                endDate: buildYearMonthDay(new Date(meta.end_date)),
                engagement: String(meta.engagement),
                delete: String(meta.delete),
                entries: []
            };
            entries.forEach(function(entry, index) {
                if (entry.timesheet_foreignkey === timesheet.timesheetID) {
                    timesheet.entries.push({
                        date: buildYearMonthDay(new Date(entry.service_date)),
                        service: entry.service_description,
                        duration: String(entry.service_duration),
                        delete: entry.delete
                    });
                    console.log("entry date", entry.date);
                } else {
                    console.log("Some error");
                }
            });
            return timesheet;
        });
        resolve(timesheets);
    });
}

function buildYearMonthDay(date) {
    console.log("build date", date.getDate());
    let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    console.log('day', day);
    let month = date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth();
    let year = date.getFullYear();
    return (year + "-" + month + "-" + day);

}

function flatten(array) {
    return array.reduce(function(a, b) {
        return a.concat(b);
    });
}

exports.getTimesheets = getTimesheets;
exports.createTimesheet = createTimesheet;
