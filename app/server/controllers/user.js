'use strict';
/*
*       CONVERT ALL FUNCTIONS TO THROW AN ERR AND JAVASCRIPT OBJECT
*       THE OBJECT AT MINIMUM SHOULD CONTAIN A SUCCESS BOOLEAN AND A
*       MESSAGE OPTIONALLY IT CAN CONTAIN THE ERROR MESSAGE A USER OBJECT
*
*/
var config = require("../../../config.js");
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
    userid:'',
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

function signUp(userPassword, userEmail, callback) {
    //this function creates a username and hashes
    //a password then stored it in the database
    console.log(conString);
    pg.connect(conString, function(err, client, done) {
        if (err) {
            return console.error(
                'error fetching client from pool in user controller',
                err);
        }
        let queryString = "SELECT * FROM userlogin WHERE email=" + "'" +
            userEmail + "'";
        client.query(queryString, function(err, result) {
            //call `done()` to release the client back to the pool

            if (err) {
                done();
                return console.error(
                    'error running select query', err);
            } else if (typeof result.rows[0] === 'undefined' &&
                validateUser(userPassword, userEmail)
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
                            "INSERT INTO UserLogin(password, email) values($1, $2)", [
                                hash,
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
                console.log("Email is all ready taken");
                console.log(err);
                done();
                callback(err, false,
                    "Email is unavailable");
            }
        });
    });


}

function deleteUser(userEmail) {
    //deletes user from database
    pg.connect(conString, function(err, client, done) {
        if (err) {
            done();

            return console.error('error fetching client from pool', err);
        }
        client.query("DELETE FROM UserLogin WHERE email=" + "'" +
            userEmail + "'",
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

function inviteUser(userEmail, userCode, callback){
    var data = [userEmail, userCode, new Date()];
    pg.connect(conString, function(err, client, done) {
        client.query("INSERT INTO UserLogin(email, invite_code, invited_on) values($1, $2, $3) ", data,
            function(err, res) {
                callback(err, res);
            });
        });
}

function authenticate(userEmail, userPassword, callback) {
    //this function checks to see if the userEmail and userPassword match
    //anything stored in the user database
    // On a succesful authentication it should generate a JWT, and send it back in JSON with
    var auth = {err: null, success: null, message: '', JWT: ''};
    pg.connect(conString, function(err, client, done) {
        if (err) {
            return console.error('error fetching client from pool', err);
        }
        client.query("SELECT * FROM UserLogin WHERE email=" + "'" +
            userEmail + "'",
            function(err, res) {
                auth.err = err;
                auth.success = false;
                if (err) {
                    done();
                    auth.message = "Error connecting to the database";
                    callback(err, auth);
                } else if (typeof(res.rows[0]) === 'undefined') {
                    done();
                    auth.message = "Email or password do not match";
                    console.log(res);
                    callback(err, auth);
                } else {
                    bcrypt.compare(userPassword, res.rows[0].password,
                        function(err, success) {
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
                                    auth.message = "Email or password do not match";
                                    callback(err, auth);
                                } else {
                                    auth.email = res.rows[0].email;
                                    auth.id = res.rows[0].user_id;
                                    payload.userid = res.rows[0].user_id;
                                    auth.message = "Authentication successful";
                                    var signedJWT = jwt.sign(payload, secret,{expiresIn: twoWeeks, issuer: "Mountain View Industries"});
                                    callback(err, auth, signedJWT);
                                }
                            }

                        });
                    done();

                }
            });
    });
}

var validateUser = function(userPassword, userEmail) {
    if (validator.isEmail(userEmail) && !validator.isNull(userPassword)) {
        return true;
    } else
        return false;
};
exports.authenticate = authenticate;
exports.signUp = signUp;
exports.invite = inviteUser;
