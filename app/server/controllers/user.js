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
pg.defaults.poolSize = 20;
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
    console.log("Rollback");
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
            data.err = true;
            resolve(data);
        });
    });

}

function finish(data) {
    return new Promise(function(resolve, reject){
        data.client.query('COMMIT', function(err, result){
            console.log("err " + err);
            var final ={
                err: data.err || false,
                message: data.message || false,
                auth : data.auth,
                signedJWT : data.signedJWT
            };

            data.done();
            resolve(final);
        });
    });
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
// Vesitigial Code
//
////////////////////////////////////////////////////////////////////////////////
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

////////////////////////////////////////////////////////////////////////////////
//
// SignUp
//
////////////////////////////////////////////////////////////////////////////////
function signUpOwner(data) {
    //this function creates a username and hashes
    //a password then stored it in the database
    let owner =[data.setup.user.email, data.setup.hash, data.setup.org.key, "Owner"];
    let insertOwner = "INSERT into Users(email, password, org_foreignkey, role) VALUES($1, $2, $3, $4)";
    return new Promise(function(resolve, reject){
        data.client.query(insertOwner, owner, function(err, result) {
            console.log(err);
            console.log(result);
            if (err) {
                console.error('error running insert query', err);
                data.message = error;
                data.success = false;
                reject(data);
            } else  {
                console.log(result);
                console.log("User created successfully");
                data.message = "User created successfully";
                data.success = true;
                resolve(data);
            }
        });
    });
}

function signUp(data) {
    //this function creates a username and hashes
    //a password then stored it in the database
    return new Promise(function(resolve, reject){
        data.client.query(
        "UPDATE Users set password=$1 WHERE email=$2 and invite_code=$3 RETURNING user_id;",[data.setup.hash, data.setup.user.email, data.setup.code],
        function(err, result) {
            console.log(result);
            if (err) {
                console.error('error running insert query', err);
                data.message = err;
                data.success = false;
                reject(data);
            } else{
                console.log(result);
                console.log("User created successfully");
                data.message = "User created successfully";
                data.success = true;
                resolve(data);
            }
        });
    });
}

////////////////////////////////////////////////////////////////////////////////
//
// Invite
//
////////////////////////////////////////////////////////////////////////////////

function getOrgCode(data){
    let findNewOwner = "SELECT index FROM organization WHERE owner_foreignkey=$1";
    return new Promise(function(resolve, reject){
        data.client.query(findNewOwner, [data.setup.owner], function(err, results){
            if(err){
                console.error("Owner could not be found in the database");
                data.message = "Owner not found";
                data.success = false;
                reject(data);
            } else{
                data.setup.orgForeignKey = results.rows[0].index;
                resolve(data);
            }
        });
    });
}
function inviteUser(data) {
    //owner, userEmail, role, userCode, callback
    console.log(data);
    let info = [data.setup.email, data.setup.code, data.setup.role, data.setup.orgForeignKey];
    let invite = "INSERT INTO Users(email, invite_code, role, org_foreignkey, invited_on) values($1, $2, $3, $4, LOCALTIMESTAMP)";
    return new Promise(function(resolve, reject){
        data.client.query(invite, info,function(err, res) {
                console.error(err);
                console.log("RES: ", res);
                data.results = res;
                resolve(data);
        });
    });
}

////////////////////////////////////////////////////////////////////////////////
//
// Authenticate
//
////////////////////////////////////////////////////////////////////////////////

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

////////////////////////////////////////////////////////////////////////////////
//
// getUserInfo
//
////////////////////////////////////////////////////////////////////////////////


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

////////////////////////////////////////////////////////////////////////////////
//
// Promise Chains
//
////////////////////////////////////////////////////////////////////////////////
function signUpOwnerPromise(data, callback){
    // This follows a different format then the rest because it's called from
    // the owner controller, and can all ready pass in a database connection/client
    validateAuthInfo(data)
    .then(hashPassword)
    .then(signUpOwner)
    .catch(rollback)
    .then(callback);
}

function signUpPromise(data, callback){
    connect(data)
    .then(begin)
    .then(validateAuthInfo)
    .then(hashPassword)
    .then(signUp)
    .catch(rollback)
    .then(finish)
    .then(callback);
}
function authenticatePromise(data, callback){
    connect(data)
    .then(findUser)
    .then(authPassword)
    .then(updateLastAccessed)
    .catch(error)
    .then(finish)
    .then(callback);
}
let getInfoPromise = function(data, callback){
    connect(data)
    .then(getInfo)
    .then(updateLastAccessed)
    .catch(error)
    .then(finish)
    .then(callback);
};

let inviteUserPromise = function(data, callback){
    connect(data)
    .then(begin)
    .then(getOrgCode)
    .then(inviteUser)
    .catch(rollback)
    .then(finish)
    .then(callback);
};
exports.authenticate = authenticatePromise;
exports.signUp = signUpPromise;
exports.invite = inviteUserPromise;
exports.signUpOwner = signUpOwnerPromise;
exports.grabInfo = getInfoPromise;


////////////////////////////////////////////////////////////////////////////////
//
// Helpers
//
///////////////////////////////////////////////////////////////////////////////
var validateAuthInfo = function(data) {
    return new Promise(function(resolve, reject){
    if (validator.isEmail(data.setup.user.email) && !validator.isNull(data.setup.user.password)) {
        resolve(data);
    } else {
        console.log(data);
        console.log("error validating");
        data.message = "Invalid Email or Password";
        data.success = false;
        reject(data);
    }
});
};

function hashPassword(data) {
    //this function will hash the password, useful for any interactions with our
    //user system
    return new Promise(function(resolve, reject){
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(data.setup.user.password, salt, function(err, hash) {
                if(err){
                    console.log("hash error", err);
                    data.err = err;
                    data.message = "Unable to hash password";
                    data.success = false;
                    reject(data);
                } else {
                    data.setup.hash = hash;
                    console.log(data);
                    resolve(data);
                }
            });
        });
    });
}

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
