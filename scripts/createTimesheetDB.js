//this is an iojs script to recreate the timesheet table in the database in postgres
var pg = require('pg');
var config = require('../config.js');
var conString = "postgres://postgres:postgres@localhost:5432/postgres";

var client = new pg.Client(conString);
client.connect();
client.query("DROP TABLE IF EXISTS Timesheets");
client.query("DROP TABLE IF EXISTS Timesheets_Meta");
// Creat table and insert 2 records into it

try {
    client.query(
       "CREATE TABLE IF NOT EXISTS Timesheets ( index serial PRIMARY KEY, timesheet_foreignkey varchar(36), service_description TEXT, service_duration REAL, service_date DATE)"
    );
    client.query(
       "CREATE TABLE IF NOT EXISTS Timesheets_Meta ( index serial PRIMARY KEY, timesheet_id varchar(36) UNIQUE, user_foreignkey INT, start_date DATE, end_date DATE, engagement INT)"
    );
    // client.query(
    //    "CREATE TABLE IF NOT EXISTS Timesheets_Services ( index serial PRIMARY KEY, organization_foreignkey INT, position_foreignkey INT, engagement INT)"
    // );
} catch (error) {
    console.error("this is an error", error);
}

setTimeout(function(){
    client.end();
    console.log("Success");
}, 1000);
/* Data Structure

{

    timesheetID: "blah",
    startDate: mm/dd/yyyy,
    endDate: mm/dd/yyyy,
    entries:[{
        "timesheet_id": "probably some UUID number",
        "user_foreignkey": "foreign key ID for user, should that be DB generated or generated by the application?",
        "service_duration": "duration of service",
        "service_description": "description of service",
        "engagement_number": "foreign key ID of customer"
    }]
}
*/
