/* This file maps your route matches
 * to functions defined in various
 * controller classes
 */
var user = require('./app/server/controllers/user');
var timesheet = require('./app/server/controllers/timesheet');
var invite = require('./app/server/controllers/invite');
var owner = require('./app/server/controllers/owner');
var jwt = require('jsonwebtoken');
var uuid = require("uuid").v4;
var config = require("./config.js");
var restify = require('restify');
var secret = require('./config.js').secret;
server = module.parent.exports.server;

/* require your controllers here */
// var siteController = require('./controllers/site');
// var adminController = require('./controllers/admin');

/* Put routes here */

// main site routes
server.get(/\/public\/?\/?.*/, restify.serveStatic({directory:__dirname + '/app'}));
server.get('/', restify.serveStatic({
    directory: __dirname + "/app/public",
    file: 'index.html'
}));

server.post('/api/signin', function(req, res, next){
    var currentUser = JSON.parse(req.body);

    user.authenticate(currentUser.email, currentUser.password,
        function(err, auth, signedJWT) {
            if (err) {
                res.send(auth);
                console.error(err);
                next();
            } else {
                console.log("Succesful signin of " +
                    currentUser.email + " = " + auth
                    .success);
                console.log("Message:" + JSON.stringify(
                        auth.message) + "\n" +
                    "message length: " + auth.length);
                res.setHeader('X-ACCESS-TOKEN', signedJWT || null);
                res.send(auth);
                next();
            }
        });
});

server.post('/api/signup', function(req, res, next){
    //Attempt to login
    //This doesn't go anywhere yet, but it does test the user controller
    console.log("Succesful post to /signup!");
    currentUser = req.body;
    console.log(currentUser);
    user.signUp(currentUser.password,
        currentUser.email, currentUser.code,
        function(err, bool, message) {
            if (err) {
                res.writeHead(400, {
                    'Content-Type': 'application/json'
                });
                res.write(
                    "There was an error talking to the server"
                );
                console.error(err);
                res.end();
            } else {
                console.log("Succesful signUp of " +
                    currentUser.email + " = " + bool
                );
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                });
                res.write('' + message);
                res.end();
            }
            console.log(message);
        });
});

server.post('/api/timesheets', function(req, res, next){
    console.log("Retrieving timesheets");
    userID = getUserID(res.header('X-ACCESS-TOKEN'));
    try {
    var request = JSON.parse(req.body);
        console.log("REQUEST " + JSON.stringify(userID));
        if (isNaN(parseFloat(userID)) && !isFinite(userID)) {
            console.log("Fail");
            res.writeHead(400, {
                'Content-Type': 'application/json'
            });
            res.send(JSON.stringify({
                "message": "Invalid user ID"
            }));
            next();
            return;
        } else {
            timesheet.getTimesheets(request, function(timesheets) {
                res.send(timesheets);
                next();
            });
        }
    } catch (err) {
        console.error(err); //Debug
        return next();
    }
});

server.post('/api/timesheet', function(req, res, next){
    var timesheetObj;
    var userID = getUserID(req.headers['X-ACCESS-TOKEN']);

    try {
        timesheetObj = JSON.parse(req.body);
    } catch (err) {
        console.error(err); //Debug
    }
    if (isNaN(parseFloat(userID)) && !isFinite(userID)) {
        res.writeHead(400, {
            'Content-Type': 'application/json'
        });
        res.send(JSON.stringify({
            "message": "Invalid user ID"
        }));
        return next();
    } else {
        timesheet.createTimesheet(timesheetObj, function(message) {
            console.log("Message " + message.message);
            if (message.message) {
                console.log("in here");
                res.send({"message":message.message});
            }
            console.log("Done");
            next();
        });
    }
});

server.post('/api/approve', function(req, res, next){
        token = req.headers["x-access-token"];
        var timesheetID;
        var userID = getUserID(req.headers('X-ACCESS-TOKEN'));

        try {
            approve = JSON.parse(req.body);
        } catch (err) {
            console.err(err); //Debug
        }
        console.log("timesheetID", timesheetID);
        if (isNaN(parseFloat(userID)) && !isFinite(userID)) {
            res.writeHead(400, {
                'Content-Type': 'application/json'
            });
            res.send(JSON.stringify({
                "message": "Invalid user ID"
            }));
            return next();
        } else {
            approve.userID = userID;
            timesheet.approveTimesheet(approve, function(message) {
                console.log("line 235", message); //Debug
                res.send(JSON.stringify(message));
                next();
            });
        }
});

server.post('/api/findTimesheet', function(req, res, next){
        try {
            request = JSON.parse(req.body);
        } catch (err) {
            console.error(err); //Debug
        }
        if (isNaN(parseFloat(request.userID)) && !isFinite(request.userID)) {
            res.writeHead(400, {
                'Content-Type': 'application/json'
            });
            res.send(JSON.stringify({
                "message": "Invalid user ID"
            }));
            return next();
        } else {
            timesheet.getTimesheets(request, function(timesheets) {
                console.log("line 194");
                res.send(JSON.stringify(timesheets));
                next();
            });
        }
});

server.post('/api/invite', function(req, res, next){
        data = JSON.parse(req.body);
        code = uuid();
        invite(data.id, data.email, data.role, code, function(err, message) {
            console.log(message);
            console.log(!err);
            data = {message: message, success: !err};
            res.send(data);
            next();
        });
});

server.post('/api/register', function(req, res, next){
    register = req.body;
    console.log("Register: " + register);
    var message;
    owner.addOrganization(register, function(result){
        if(result.err){
            message = "Failure";
        } else {
            message = "Success";
        }
        res.send(message);
        next();
    });
});

server.post('/api/register', function(req, res, next){
    var register = req.body;
    var message;
    owner.addOrganization(register, function(result){
        if(result.err){
            message = "Failure";
        } else {
            message = "Success";
        }
        console.log("REGISTER END");
        res.send(message);
        next();
    });

});

server.get(/.*/, restify.serveStatic({
    directory: __dirname + "/app/public",
    file: 'index.html'
}));

/////////////////////////////////////////////////////////////////////////////
//
//  Helper funcitons
//
////////////////////////////////////////////////////////////////////////////

var getUserID = function(token) {
    var state;
    try {
        state = jwt.verify(token, secret);
        return state.userid;
    } catch (err) {
        console.log(err);
        return null;
    }
};
