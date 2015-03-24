//this is an iojs script to recreate the user database in postgresvar conString = "pg://postgres:aldorak@localhost:5432/employees";
var pg = require('pg');
var conString = "pg://postgres:aldorak@localhost:5432/employees";

var client = new pg.Client(conString);
client.connect();

client.query("DROP TABLE IF EXISTS UserLogin");
// Creat table and insert 2 records into it

try{
client.query("CREATE TABLE IF NOT EXISTS UserLogin ( id serial PRIMARY KEY, username varchar(32) UNIQUE,  password varchar(64) , email varchar(32) UNIQUE)");
}
catch (error) {
  console.log(error);
}
