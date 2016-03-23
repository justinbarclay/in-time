var pg = require('pg');
var config = require('../config.js');
var conString = config.postgres;


function createOrganization() {
    var client = new pg.Client(conString);
    client.connect();
    client.query("DROP TABLE IF EXISTS Organization");

    try {
        client.query(
            "CREATE TABLE IF NOT EXISTS Organization ( index serial PRIMARY KEY, orgname varchar(32),  domain varchar(32), owner_foreignkey INTEGER )"
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
