/*
*       CONVERT ALL FUNCTIONS TO THROW AN ERR AND JAVASCRIPT OBJECT
*       THE OBJECT AT MINIMUM SHOULD CONTAIN A SUCCESS BOOLEAN AND A
*       MESSAGE OPTIONALLY IT CAN CONTAIN THE ERROR MESSAGE A USER OBJECT
*
*/
var config = require("../../../config.json");
var validator = require('validator');
var jwt = require("jsonwebtoken");
var bcrypt = require('bcrypt');
var pg = require('pg');

/** User Controller
 * This will handle creating a user, removing a user, and authenticating a loging
 * This needs to be refactored to take in a user object
 */
const conString = config.postgres;
const secret = config.secret;
const twoWeeks = 20160; // Two weeks in minutes

/* Structure of JWT payload
* It should have a username, time of creation(iat), and email address
* When decrypting the payload we can confirm who is requestion infomation and
* make sure they only have access to that user's information
*/
var payload = {
    iat: '',
    username:'',
    email: ''
};

function hashPassword(userPassword, callback) {
    //this function will hash the password, useful for any interactions with our
    //user system
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(userPassword, salt, function(err, hash) {
            callback(err, hash);
        });
    });
}

function signUp(userName, userPassword, userEmail, callback) {
    //this function creates a username and hashes
    //a password then stored it in the database
    pg.connect(conString, function(err, client, done) {
        if (err) {
            return console.error(
                'error fetching client from pool in user controller',
                err);
        }
        queryString = "SELECT * FROM userlogin WHERE username=" + "'" +
            userName + "'";
        client.query(queryString, function(err, result) {
            //call `done()` to release the client back to the pool

            if (err) {
                done();
                return console.error(
                    'error running select query', err);
            } else if (typeof result.rows[0] === 'undefined' &&
                validateUser(userName, userPassword, userEmail)
            ) {
                console.log(userPassword);
                hashPassword(userPassword, function(err, hash) {

                    if (err) {
                        done();
                        return console.error(
                            "error hashing password",
                            err);
                    } else {
                        client.query(
                            "INSERT INTO UserLogin(username, password, email) values($1, $2, $3)", [
                                userName, hash,
                                userEmail
                            ],
                            function(err, result) {
                                done();
                                if (err) {
                                    console.error(
                                        'error running insert query',
                                        err);
                                    callback(err,
                                        false);
                                } else {
                                    console.log(
                                        result);
                                    console.log(
                                        "User created successfully"
                                    );
                                    callback(err,
                                        true,
                                        "User created successfully"
                                    );
                                }

                            });
                    }
                });

            } else {
                console.log("Username all ready taken");
                done();
                callback(err, false,
                    "Username or e-mail is unavailable");
            }
        });
    });


}

function deleteUser(userName) {
    //deletes user from database
    pg.connect(conString, function(err, client, done) {
        if (err) {
            done();

            return console.error('error fetching client from pool', err);
        }
        client.query("DELETE FROM UserLogin WHERE username =" + "'" +
            userName + "'",
            function(err, res) {
                if (err) {
                    console.error('error with a DELETE query', err);
                    done();

                } else {
                    console.log(res);
                }
                done();

            });

    });
}

function authenticate(userName, userPassword, callback) {
    //this function checks to see if the userName and userPassword match
    //anything stored in the user database
    // On a succesful authentication it should generate a JWT, and send it back in JSON with
    var auth = {err: null, success: null, message: '', JWT: ''};
    pg.connect(conString, function(err, client, done) {
        if (err) {
            return console.error('error fetching client from pool', err);
        }
        client.query("SELECT * FROM UserLogin WHERE username =" + "'" +
            userName + "'",
            function(err, res) {
                auth.err = err;
                auth.success = false;
                if (err) {
                    done();
                    auth.message = "Error connecting to the database";
                    callback(err, auth);
                } else if (typeof(res.rows[0]) === 'undefined') {
                    done();
                    auth.message = "Username or password do not match";
                    console.log(res);
                    callback(err, auth);
                } else {
                    bcrypt.compare(userPassword, res.rows[0].password,
                        function(err, success) {
                            payload.username = res.rows[0].username;
                            payload.email = res.rows[0].email;
                            payload.iat = Date.now();
                            //Set up the auth object to have error and response in them, and then decide how to respond
                            auth.err = err;
                            auth.success = success;
                            if (err) {
                                // code to add token to browser to act logged in
                                // probably need to add a token to table somewhere as well

                                 done();

                                auth.success = false;
                                auth.message = "Error connecting to database";
                                callback(err, auth);
                            } else {
                                done();
                                if (success === false) {
                                    auth.message = "Username or password do not match";
                                    callback(err, auth);
                                } else {
                                    auth.message = "Authentication successful";
                                    auth.JWT = jwt.sign(payload, secret,{expiresInMinutes: twoWeeks, issuer: "Mountain View Industries"});
                                    callback(err, auth);
                                }
                            }

                        });
                    done();

                }
            });
    });
}

var validateUser = function(userName, userPassword, userEmail) {
    if (validator.isLength(userName, 2, 32) && validator.isEmail(userEmail) &&
        !validator.isNull(userPassword)) {
        return true;
    } else
        return false;
};
exports.authenticate = authenticate;
exports.signUp = signUp;
