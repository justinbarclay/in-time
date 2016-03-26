var pg = require('pg');
var config = require('../config.js');
var conString = config.postgres;


function createOrganization() {
    var client = new pg.Client(conString);
    client.connect();
    client.query("DROP TABLE IF EXISTS organization");

    try {
        client.query(
            "CREATE TABLE IF NOT EXISTS organization ( index serial PRIMARY KEY, orgname TEXT,  domains TEXT, owner_foreignkey INTEGER )"
        );
    } catch (error) {
        console.log(error);
    }
    setTimeout(function() {
        client.end();
        console.log("Succesful");
    }, 1000);
}

module.exports = createOrganization;
