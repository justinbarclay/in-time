/** User Controller
* This will handle creating a user, removing a user, and authenticating a loging
*
*/
var pg = require('pg');
var bcrypt = require('bcrypt');

function hashPassword(userPassword){
  //this function will hash the password, useful for any interactions with our
  //user system
  return bcrypt(userPassword);
}

function createUser(userName, userPassword){
  //this is an empty function that will eventually create a username and hashing
  //a password then storin it in the database
}

function deleteUser(userName, userPassword){
  //deletes user from database
}

function authenticateUser(userName, userPassword){
  //this function checks to see if the userName and userPassword match the
  //anything stored in the user database

  password = hashPassword(userPassword);

}
