// userDB = require("./createUserDB");
// timesheetDB = require("./createTimesheetDB");
// upsert = require("./upsertFunctions");
// createOrgDB = require("./createOrgDB");

// console.log(upsert());
// console.log(timesheetDB());
// console.log(userDB());
// console.log(createOrgDB());

let setupTables = require('./setupTables');
let setUpDemo = require('./setUpDemo');
let data = require('./demodata');

setupTables(data, setUpDemo);
