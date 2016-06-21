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
pg.defaults.poolSize = 20;
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
    userid: '',
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

function signUp(userPassword, userEmail, inviteCode, callback) {
    //this function creates a username and hashes
    //a password then stored it in the database
    console.log(conString);
    console.log(userPassword);
    console.log(userEmail);
    pg.connect(conString, function(err, client, done) {
        if (err) {
            return console.error(
                'error fetching client from pool in user controller',
                err);
        }
        if (validateUser(userPassword, userEmail)) {
            console.log(userPassword);
            hashPassword(userPassword, function(err, hash) {

                if (err) {
                    done();
                    return console.error(
                        "error hashing password",
                        err);
                } else {
                    client.query(
                        "UPDATE Users set password='" + hash + "' WHERE email='" + userEmail + "' and invite_code='" + inviteCode + "' RETURNING user_id;",
                        function(err, result) {
                            done();
                            if (err) {
                                console.error(
                                    'error running insert query',
                                    err);
                                callback(err,
                                    false);
                            } else if(result.rows[0]) {
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
                            else{
                                console.log(result);
                                callback(err, false, "Unable to process your request, please try again. If you continue to have difficulty, please speak to your system administrator");
                            }

                        });
                }
            });
        }
    });
}

function signUpOwner(userPassword, userEmail, orgkey, callback) {
    //this function creates a username and hashes
    //a password then stored it in the database
    pg.connect(conString, function(err, client, done) {
        if (err) {
            return console.error(
                'error fetching client from pool in user controller',
                err);
        }
        if (validateUser(userPassword, userEmail)) {
            console.log(userPassword);
            hashPassword(userPassword, function(err, hash) {
                if (err) {
                    done();
                    return console.error(
                        "error hashing password",
                        err);
                } else {
                    var owner =[userEmail, hash, orgkey, "Owner"];
                    console.log("blah");
                    client.query(
                        "INSERT into Users(email, password, org_foreignkey, role) VALUES($1, $2, $3, $4)", owner,
                        function(err, result) {
                            done();
                            if (err) {
                                console.error('error running insert query', err);
                                callback(err, false);
                            } else if(result.rows[0]) {
                                console.log(result);
                                console.log("User created successfully");
                                callback(err, true, "User created successfully");
                            }
                            else{
                                console.log(result);
                                callback(err, false, "Unable to process your request, please try again. If you continue to have difficulty, please speak to your system administrator");
                            }

                        });
                }
            });
        }
    });
}
function deleteUser(userEmail) {
    //deletes user from database
    pg.connect(conString, function(err, client, done) {
        if (err) {
            done();

            return console.error('error fetching client from pool', err);
        }
        client.query("DELETE FROM Users WHERE email=" + "'" +
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

function inviteUser(owner, userEmail, role, userCode, callback) {
    var data = [userEmail, userCode, role];
    console.log("Usercode: "+ userCode);
    pg.connect(conString, function(err, client, done) {
        client.query("SELECT index FROM organization WHERE owner_foreignkey="+owner, function(err, results){
            if(!!results){
                var orgforeignkey = results.rows[0].index;
                data.push(orgforeignkey);
                console.log(data);
                client.query("INSERT INTO Users(email, invite_code, role, org_foreignkey, invited_on) values($1, $2, $3, $4, LOCALTIMESTAMP) ", data,
                    function(err, res) {
                        console.log("RES: ", res);
                        callback(err, res);
                });
            } else {
                // If this query fails, that mean that the ownerid could not be
                // in the database
                callback(new Error(["Owner could not be found in the database", "user.js", 184]), "Owner not found");
            }
        });
    });
}

function grabInfo(user, callback){
    let queryTerm;
    let query;
    if(user.id){
        queryTerm = user.id;
        query = "SELECT email, user_id, role FROM users where user_id=$1";
    } else{
        queryTerm = user.email;
        query = "SELECT email, user_id, role FROM users where email=$1";
    }
    pg.connect(conString, function(err, client, done) {
        if (err) {
            return console.error('error fetching client from pool', err);
        }
        client.query(query, [queryTerm], function(err, res) {
            done();
            let auth = {};
            if(err){
                auth.message = err;
                auth.success = false;
                console.error(err);
                callback(auth);
            } else{
                auth.email = res.rows[0].email;
                auth.id = res.rows[0].user_id;
                auth.role = res.rows[0].role;
                auth.success = true;
                auth.message = "Authentication successful";
                callback(auth);
            }
        });
    });
}

function authenticate(userEmail, userPassword, callback) {
    //this function checks to see if the userEmail and userPassword match
    //anything stored in the user database
    // On a succesful authentication it should generate a JWT, and send it back in JSON with
    var auth = {
        err: null,
        success: null,
        message: '',
    };
    if(userPassword.length < 5){
        auth.message = "There was a problem with your login.";
        return callback("Password entered is less than 5 characters.", auth);
    }
    pg.connect(conString, function(err, client, done) {
        if (err) {
            return console.error('error fetching client from pool', err);
        }
        client.query("SELECT email, user_id, role, password FROM Users WHERE email=$1", [userEmail],
            function(err, res) {
                auth.err = err;
                auth.success = false;
                done();
                if (err) {
                    auth.message = "Error connecting to the database";
                    callback(err, auth);
                } else if (typeof(res.rows[0]) === 'undefined') {
                    auth.message = "There was a problem with your login.";
                    console.log(res);
                    callback(err, auth);
                } else {
                    console.log(res.rows);
                    bcrypt.compare(userPassword, res.rows[0].password,
                        function(err, success) {
                            payload.iat = Date.now();
                            //Set up the auth object to have error and response in them, and then decide how to respond
                            auth.err = err;
                            auth.success = success;
                            if (err) {
                                // code to add token to browser to act logged in
                                // probably need to add a token to table somewhere as well
                                auth.success = false;
                                auth.message = "There was a problem with your login.";
                                callback(err, auth);
                            } else {
                                if (success === false) {
                                    auth.message = "There was a problem with your login.";
                                    callback(err, auth);
                                } else {
                                    auth.email = res.rows[0].email;
                                    auth.id = res.rows[0].user_id;
                                    auth.role = res.rows[0].role;
                                    auth.message = "Authentication successful";
                                    payload.userid = res.rows[0].user_id;
                                    var signedJWT = jwt.sign(payload, secret, {
                                        expiresIn: twoWeeks,
                                        issuer: "Mountain View Industries"
                                    });
                                    callback(err, auth, signedJWT);
                                }
                            }

                        });
                }
            });
    });
}
var updateLastAccessed = function(userID){
    pg.connect(conString, function(err, client, done) {
        if (err) {
            return console.error('error fetching client from pool', err);
        }
        client.query("UPDATE users SET last_accessed=now() WHERE user_id=$1", [userID],
            function(err, res) {
                done();
        });
    });
};
var validateUser = function(userPassword, userEmail) {
    if (validator.isEmail(userEmail) && !validator.isNull(userPassword)) {
        return true;
    } else {
        return false;
    }
};
exports.authenticate = authenticate;
exports.signUp = signUp;
exports.invite = inviteUser;
exports.signUpOwner = signUpOwner;
exports.grabInfo = grabInfo;
