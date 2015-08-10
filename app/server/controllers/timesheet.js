"use strict";

var config = require("../../../config.json");
var pg = require('pg');
var conString = config.postgres;
var uuid = require('uuid').v4;

//Lowers timeout time, to close client connection sooner, this may cause problems
//in the long run as queries to the database take a longer time
//but for now, while running tests this needs to be short

//without this being set pg.defaults to 30 clients running and a timeout time for
//each client of 30s (30000)
pg.defaults.poolIdleTimeout = 10000;
/** Timesheet Controller
 * This will handle creating and retrieving timesheets from pg
 *
 */

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

}
*/
//May want to look into implementing prepared queires
// as seen at https://github.com/brianc/node-postgres/wiki/Prepared-Statements

let connect = function(data) {
    return new Promise(function(resolve, reject) {
        pg.connect(conString, function(err, client, done) {
            if (err) {
                throw new Error(err, 37);
            } else {
                data.client = client;
                data.done = done;
                resolve(data);
            }
        });
    });
};

function error(err) {
    console.error(err);
}

function finish(data) {
    console.log(data.entries);
    data.done();
    data.client.end();
    return data;
}
////////////////////////////////////////////////////////////////////////////////
//
//Promises
//
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
//Insert Queries
////////////////////////////////////////////////////////////////////////////////
let createMetaData = function(timesheet) {

    return new Promise(function(resolve, reject) {
        let queryString =
            "INSERT INTO Timesheets_Meta (timesheet_id, user_foreignkey, start_date, end_date, engagement) VALUES($1, $2, $3, $4, $5)";
        //Asynchronously insert data into the database
        let metaTimesheet = [timesheet.timesheetID, timesheet.userID,
            timesheet.start_date,
            timesheet.end_date, timesheet.engagement
        ];
        timesheet.client.query(queryString, metaTimesheet, function(
            err, result) {
            if (err) {
                console.log("error line 68");
                throw new Error(err);
            } else {
                resolve(timesheet);
            }
        });
    });
};

function addEntries(timesheet) {
    return new Promise(function(resolve, reject) {
        let entries = timesheet.entries;
        let total = 0;
        entries.forEach(function(row) {
            var queryString =
                "INSERT INTO Timesheets (timesheet_foreignkey, service_duration, service_description, service_date) VALUES($1, $2, $3, $4)";
            //Asynchronously insert data into the database
            var entry = [
                row.timesheet_foreignkey, row.service_duration,
                row.service_description, row.service_date
            ];
            timesheet.client.query(queryString, entry, function(
                err, result) {
                total += 1;
                if (err ) {
                    console.log("error line 93");
                    throw new Error(err);
                } else {
                    if (total === entries.length) {
                        resolve(timesheet);
                    }
                }
            });
        });
    });
}

////////////////////////////////////////////////////////////////////////////////
//Read Data Queries
////////////////////////////////////////////////////////////////////////////////
function getTimesheetIDs(data) {
    //grabs a list of user timesheets and passes it on in a callback
    let userID = data.userID;
    if (userID !== parseInt(userID, 10)) {
        throw new Error("UserID is not an Int");
    }
    return new Promise(function(resolve, reject) {
        let queryString =
            "SELECT timesheet_id, start_date, end_date, engagement FROM Timesheets_Meta WHERE user_foreignkey=" +
            userID;
        data.client.query(queryString, function(err, result) {
            if (err) {
                throw new Error(err, 157);
            } else {
                console.log(
                    "Meta information succesfully selected"
                );
                data.meta = result.rows;
                resolve(data);
            }
        });
    });
}

function getEntries(data) {
    let timesheetIDs = data.meta.map(function(meta) {
        return meta.timesheet_id;
    });
    let total = 0;
    data.entries = [];
    return new Promise(function(resolve, reject) {
        timesheetIDs.forEach(function(timesheetID) {
            let queryString =
                "SELECT * FROM Timesheets WHERE timesheet_foreignkey ='" +
                timesheetID + "'";
            data.client.query(queryString, function(err, result) {
                total++;
                if (err) {
                    console.error(err);
                    throw new Error(err, 146);
                } else if (result.rows.length > 0){
                    data.entries.push(result.rows);
                    if (total === timesheetIDs.length) {
                        console.log("getEntries 153");
                        resolve(data);
                    }
                }
            });
        });
    });
}

////////////////////////////////////////////////////////////////////////////////
//Return Data Queries
////////////////////////////////////////////////////////////////////////////////
function buildTimesheets(data){
    let meta_info = data.meta;
    let entries = data.entries;

    let timesheets = meta_info.map(function(meta){
        let timesheet = {};
        timesheet = meta.timesheetID;
        timesheet.entries = [];
        entries.forEach(function(entry, index){
            if (entry.timesheetID === timesheet.timesheetID){
                timesheet.entries.push(entry);
                entries.slice(index,1);
            }
        });
    });
    console.log(timesheets);
    return timesheets;
}
function deleteTimesheetEntries(data){
    return new Promise(function(resolve, reject){
                data.forEach(function(index) {
                    data.client.query(
                        "DELETE FROM Timesheets WHERE timesheet_foreignkey=$1", [
                            index
                        ],
                        function(err, result) {
                            if (err) {
                                console.error(
                                    'error deleting query into timesheet',
                                    err);
                                    throw new Error(err, 209);
                            } else {
                                console.log(
                                    "Timesheet succesfully deleted  "
                                );
                                resolve(result);
                            }
                        });
                });
            });
        }

        function deleteTimesheetMeta(data){
            return new Promise(function(resolve, reject){
                        data.forEach(function(index) {
                            data.client.query(
                                "DELETE FROM Timesheets_Meta WHERE timesheet_id=$1", [
                                    index
                                ],
                                function(err, result) {
                                    if (err) {
                                        console.error(
                                            'error deleting query into timesheet',
                                            err);
                                            throw new Error(err, 209);
                                    } else {
                                        console.log(
                                            "Timesheet succesfully deleted  "
                                        );
                                        resolve(result);
                                    }
                                });
                        });
                    });
                }

function createTimesheet(data) {
    connect(data)
        .then(createMetaData)
        .then(addEntries)
        .then(function(timesheet) {
            console.log("Timesheet for " + timesheet.userID +
                " entered into database at " + new Date());
            return timesheet;
        })
        .then(finish)
        .catch(error);

}

function getTimesheets(request, res, callback) {
    connect(request)
        .then(getTimesheetIDs)
        .then(getEntries)
        .then(Promise.resolve(buildTimesheets))
        .catch(error)
        .then(finish)
        .then(callback);

}

//
// /* TEST IMPLEMENTATION */
// //Running some tests
// //these tests should be move to mocha as soon as possible
// function createTimesheetData(rowsInTimesheets){
function generateMetaData() {
    return {
        "timesheetID": uuid(),
        "userID": 1,
        "start_date": "01/01/2015",
        "end_date": "01/15/2015",
        "engagement": Math.floor(Math.random() * 10000)
    };
}

function generateEntry(id) {
    return {
        "timesheet_foreignkey": id,
        "service_duration": (Math.floor(Math.random() * 12)),
        "service_description": "description of service",
        "service_date": "05/07/2015"
    };

}

function generateTimesheet(numberOfEntries) {
    var timesheet = generateMetaData();
    var entries = [];
    var rows = numberOfEntries ? numberOfEntries : Math.floor(Math.random() * 7 +
        3);
    for (let i = 0; rows > i; i++) {
        entries.push(generateEntry(timesheet.timesheetID));
    }
    timesheet.entries = entries;
    return timesheet;
}

// getUserTimesheetIDs(1, function(err, bool, result){
//     console.log(result);
// });
// let time = generateTimesheet();
// createTimesheet(time);
// let timesheet = function() {
//     let timethingy = {};
//     return {
//         set: function(obj) {
//             timethingy = obj;
//         },
//         get: function() {
//             return timethingy;
//         }
//     };
// };
//
// getTimesheets({
//     "userID": 1
// }, null, function(data){
//     console.log(data);
// });
// let myTimesheet = timesheet();
// //     myTimesheet.setTimethingy(10);
//     console.log(myTimesheet.getTimethingy());
// connect({"userID": 1}).then(getTimesheetIDs).then(function(data){
//     myTimesheet.set(data)
//     return data;
// }).catch(error).then(finish);
// console.log("generateMetaData");
// console.log(generateMetaData());
// console.log("generateEntry");
// console.log(generateEntry(1));
// console.log("Generate Timesheet");
// console.log(generateTimesheet());

//
// var baz = setTimeout(getTimesheet(function(err, bool, result){
//     console.log("GET");
//     if (err) {
//         console.error("Error: ", err);
//     } else {
//         console.log("Returned bool: ", bool);
//         console.log(result);
//     }
// }), 5000);
//
// baz.
//
// deleteArrays = Array.apply(0, Array(50)).map(function (x, y) { return y + 1; });
// //deleteArrays = 9;
//
// //console.log("Is Array? " + (!Array.isArray(deleteArrays) && typeof deleteArrays !== "number"));
// deleteTimesheet(deleteArrays, function(err, bool, result){
//     console.error("Error delete timesheet", err);
//     console.log("Delete operation succeeded? " + bool);
//     console.log(result);
// })
