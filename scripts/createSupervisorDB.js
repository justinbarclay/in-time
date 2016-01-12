var pg = require('pg');
var config = require('../config.js');
var conString = config.postgres;


function createSupervisorTable() {
    var client = new pg.Client(conString);
    client.connect();
    client.query("DROP TABLE IF EXISTS SupervisorTable");
    // Creat table and insert 2 records into it

    try {
        client.query(
            "CREATE TABLE IF NOT EXISTS Supervisor ( index serial PRIMARY KEY, supervisor_foreignkey INTEGER,  employee_foreingkey INTEGER )"
        );
    } catch (error) {
        console.log(error);
    }
    setTimeout(function() {
        client.end();
        console.log("Succesful");
    }, 1000);
}

createSupervisorTable();
