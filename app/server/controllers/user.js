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
let conString = config.postgres;
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

////////////////////////////////////////////////////////////////////////////////
//
//  Boiler Plate for Database interaction
//
////////////////////////////////////////////////////////////////////////////////
let connect = function(data) {
    //Currently unaware of a goodway to pass around the query data, known as data
    //and the client and done objects. I have decidced to attach them to the query
    //itself so that at anypoint in the chain I can call client.query or client.end
    //as well as done()
    return new Promise(function(resolve, reject) {
        pg.connect(conString, function(err, client, done) {
            if (err) {
                console.log("error1");
                console.error(err);
                throw err;
            } else {
                resolve({
                    setup: data,
                    done: done,
                    client: client
                });
            }
        });
    });
};
function rollback(data) {
    //if there was a problem rolling back the query
    //something is seriously messed up.  Return the error
    //to the done function to close & remove this client from
    //the pool.  If you leave a client in the pool with an unaborted
    //transaction weird, hard to diagnose problems might happen.
    return new Promise(function(resolve, reject){
        data.client.query('ROLLBACK', function(err) {
            if (err) {
                throw err;
            }
            resolve({err: true});
        });
    });

}

function finish(data) {
    var final ={
        auth : data.auth,
        signedJWT : data.signedJWT
    };

    data.done();
    return final;
}

function begin(data) {
    //as long as we do not call the `done` callback we can do
    //whatever we want...the client is ours until we call `done`
    //on the flip side, if you do call `done` before either COMMIT or ROLLBACK
    //what you are doing is returning a client back to the pool while it
    //is in the middle of a transaction.
    //Returning a client while its in the middle of a transaction
    //will lead to weird & hard to diagnose errors.
    return new Promise(function(resolve, reject) {
        data.client.query('BEGIN', function(err) {
            if (err) {
                throw err;
            } else {
                resolve({
                    setup: data.setup,
                    client: data.client,
                    done: data.done
                });
            }
        });
    });
}
function error(data){
    var newData ={
        err: data.auth.err ,
        done: data.done,
        auth: data.auth,
        signedJWT:false
};
    return newData;
}
////////////////////////////////////////////////////////////////////////////////
//
// Main Code
//
////////////////////////////////////////////////////////////////////////////////
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

function authenticate(user, callback) {
    //this function checks to see if the userEmail and userPassword match
    //anything stored in the user database
    // On a succesful authentication it should generate a JWT, and send it back in JSON with
    var auth = {
        err: null,
        success: null,
        message: '',
    };
    var userEmail = user.email;
    var userPassword = user.password;
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


////////////////////////////////////////////////////////////////////////////////
//
// Authenticate
//
////////////////////////////////////////////////////////////////////////////////

function authenticatePromise(data, callback){
    connect(data)
    .then(findUser)
    .then(authPassword)
    .then(updateLastAccessed)
    .catch(error)
    .then(finish)
    .then(callback);
}

var findUser = function(data){
    let selectUser = 'SELECT email, user_id, role, password FROM Users WHERE email=$1';
    return new Promise(function(resolve, reject) {
        data.client.query(selectUser, [data.setup.email], function(err, res) {
            let auth = {
                        err: err || false,
                        success: false
                    };
            data.auth = auth;
            if (err) {
                data.auth.message = "Error connecting to the database";
                console.log(data.auth.message);
                reject(data);
            } else if (typeof(res.rows[0]) === 'undefined') {
                data.auth.message = "There was a problem with your login.";
                console.log(data.auth.message);
                reject(data);
            } else {
                data.auth.email = res.rows[0].email;
                data.auth.id = res.rows[0].user_id;
                data.auth.role = res.rows[0].role;
                data.result = {password: res.rows[0].password};
                resolve(data);
            }
        });
    });
};

var authPassword = function(data){
    var payload = {};
    return new Promise(function(resolve, reject){
        bcrypt.compare(data.setup.password, data.result.password, function(err, success) {
            payload.iat = Date.now();
            //Set up the auth object to have error and response in them, and then decide how to respond
            data.auth.err = err || false;
            if (err) {
                // code to add token to browser to act logged in
                // probably need to add a token to table somewhere as well
                data.auth.success = false;
                data.auth.message = "There was a problem with your login.";
                reject(data);
            } else {
                if (success === false) {
                    data.auth.message = "There was a problem with your login.";
                    reject(data);
                } else {
                    data.auth.success = success;
                    data.auth.message = "Authentication successful";
                    payload.userid = data.auth.id;
                    var signedJWT = jwt.sign(payload, secret, {
                        expiresIn: twoWeeks,
                        issuer: "New Plagiarist Media"
                    });
                    data.signedJWT = signedJWT;
                    resolve(data);
                }
            }
        });
    });
};

var updateLastAccessed = function(data){
    return new Promise(function(resolve, reject){
        data.client.query("UPDATE users SET last_accessed=now() WHERE user_id=$1", [data.auth.id],
            function(err, res) {
                if(err){
                    console.error(err);
                    data.auth.err = err;
                    reject(data);
                } else {
                    resolve(data);
                }
        });
    });
};

let getInfoPromise = function(data, callback){
    connect(data)
    .then(getInfo)
    .then(updateLastAccessed)
    .catch(error)
    .then(finish)
    .then(callback);
};
function getInfo(data){
    let queryTerm;
    let query;
    if(data.setup.id){
        queryTerm = data.setup.id;
        query = "SELECT email, user_id, role FROM users where user_id=$1";
    } else{
        queryTerm = data.setup.email;
        query = "SELECT email, user_id, role FROM users where email=$1";
    }
    return new Promise(function(resolve, reject){
        data.client.query(query, [queryTerm], function(err, res) {
            let auth;
            if(err){
                auth = {
                    message: err,
                    success: false
                };

                console.error(err);
                reject(data);
            } else{
                auth = {
                    email: res.rows[0].email,
                    id: res.rows[0].user_id,
                    role: res.rows[0].role,
                    success: true,
                    message: "Authentication successful"
                };

                data.auth = auth;
                resolve(data);
            }
        });
    });
}

exports.authenticate = authenticatePromise;
exports.signUp = signUp;
exports.invite = inviteUser;
exports.signUpOwner = signUpOwner;
exports.grabInfo = getInfoPromise;

var validateUser = function(userPassword, userEmail) {
    if (validator.isEmail(userEmail) && !validator.isNull(userPassword)) {
        return true;
    } else {
        return false;
    }
};
