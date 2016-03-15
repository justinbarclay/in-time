var pg = require('pg');
var config = require('../config.js');
var conString = config.postgres;


function createUserDB() {
    var client = new pg.Client(conString);
    client.connect();
    client.query("DROP TABLE IF EXISTS UserLogin");
    // Creat table and insert 2 records into it

    try {
        client.query(
            "CREATE TABLE IF NOT EXISTS UserLogin ( user_id serial PRIMARY KEY, username varchar(32) UNIQUE,  password varchar(64), email varchar(32) UNIQUE, role varchar(32), invited varchar(36), invited_on timestamptz,last_accessed timestamptz )"
        );
    } catch (error) {
        console.log(error);
    }
    setTimeout(function() {
        client.end();
        console.log("Succesful");
    }, 1000);
}
/* Data Structure
{
"user_id": "handled by DB as an incrementing number"
"username": "String of length 32 or less"
"password": "a hash of length 64"
"email": "string of length 32 or less"
}
*/

module.exports = createUserDB;
