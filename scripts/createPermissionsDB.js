var pg = require('pg');
var config = require('../config.js');
var conString = config.postgres;


function createPermissionsTable() {
    var client = new pg.Client(conString);
    client.connect();
    client.query("DROP TABLE IF EXISTS PermissionsTable");
    // Creat table and insert 2 records into it

    try {
        client.query(
            "CREATE TABLE IF NOT EXISTS Permissions ( index serial PRIMARY KEY, permission varchar(32),  role varchar(32) )"
        );
    } catch (error) {
        console.log(error);
    }
    setTimeout(function() {
        client.end();
        console.log("Succesful");
    }, 1000);
}

createPermissionsTable();
