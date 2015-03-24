/** User Controller
* This will handle creating a user, removing a user, and authenticating a loging
*
*/
var pg = require('pg');
var conString = "pg://postgres:postgres@localhost:5432/employees";
var client = new pg.Client(conString);

var bcrypt = require('bcrypt');

function hashPassword(userPassword, callback){
  //this function will hash the password, useful for any interactions with our
  //user system
  bcrypt.genSalt(12, function(err, salt) {
    bcrypt.hash(userPassword, salt, function(err, hash){

      callback(err, hash);
    });
  });
}

function createUser(userName, userPassword,  userEmail){
  //this is an empty function that will eventually create a username and hashing
  //a password then storin it in the database
  pg.connect(conString, function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    queryString =  "SELECT * FROM userlogin WHERE username="  + "'"+userName+ "'";
    client.query(queryString, function(err, result) {
      //call `done()` to release the client back to the pool

      if(err) {
        done();
        client.end();
        return console.error('error running select query', err);
      } else if (typeof result.rows[0] === 'undefined'){

        hashPassword(userPassword, function(err, hash){

          if (err){
            client.end();
            return console.error("error hashing password", err);
          } else {
            client.query("INSERT INTO UserLogin(username, password, email) values($1, $2, $3)", [userName, hash, userEmail], function(err, res){
              done();

              if (err) {
                client.end();
                return console.error('error running insert query', err);
              } else {
                return console.log("User created successfully");
              }
              client.end();
            });
          }
        });

      } else {
        console.log("Username all ready taken");
        done();
        client.end();
      }


    });
});


}

function deleteUser(userName){
  //deletes user from database
  pg.connect(conString, function(err, client, done) {
    if(err) {
      done();
      client.end();
      return console.error('error fetching client from pool', err);
    }
    client.query("DELETE FROM UserLogin WHERE username =" + "'" + userName + "'", function(err, res){
      if(err){
        console.error('error with a DELETE query',err);
        done();
        client.end();
      } else {
        console.log(res);
      }
      done();
      client.end();
    });

  });
}

function authenticateUser(userName, userPassword, callback){
  //this function checks to see if the userName and userPassword match the
  //anything stored in the user database
  pg.connect(conString, function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    client.query("SELECT * FROM UserLogin WHERE username =" + "'" + userName + "'", function(err, res){
      if(err){
        done();
        client.end();
        callback(err, false);
      } else if(typeof(res.rows[0]) === 'undefined'){
        done();
        client.end();
        console.log(res);
        callback(err, false);
      } else {
        bcrypt.compare(userPassword, res.rows[0].password, function(err, res){
          if (err) {
            // code to add token to browser to act logged in
            // probably need to add a token to table somewhere as well
            done();
            client.end();
            callback(err, res);
          } else {
            done();
            client.end();
            callback(err, res);
          }

        });
        done();
        client.end();
      }
    });
  });
}

function helper(){
  function connect(callback)
  {
    var conString = "pg://postgres:postgres@localhost:5432/employees";
    pg.connect(conString, function(err, client, done){
        callback(err, client, done);
      });
  }
  function databaseError(err, callback)
  {
    done();
    client.end();
    callback(err, false);
  }
  function generateToken (userName) {

  }
  function authenticateToken(userName)
  {

  }
  function validateEmail(userEmail){

  }
  function validateUsername(userName){

  }
  function validatePassword(userPassword){

  }
}
//createUser("test user", "1234567", "test@email.com");
//some basic tests
//createUser("new user", "testpassword", "newuser@email.com");
//authenticateUser("new user", "testpassword");
//authenticateUser("new user", "bunny");

//deleteUser("new user");
module.exports.authenticate = authenticateUser;
