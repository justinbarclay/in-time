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
                res.send(JSON.stringify(auth));
                console.error(err);
                next();
            } else {
                console.log("Succesful signUp of " +
                    currentUser.email + " = " + auth
                    .success);
                console.log("Message:" + JSON.stringify(
                        auth.message) + "\n" +
                    "message length: " + auth.length);
                res.setHeader('X-ACCESS-TOKEN', signedJWT || null);
            }
            res.send(auth);
            return next();
        });
});

server.post('/api/signup', function(req, res, next){
    //Attempt to login
    //This doesn't go anywhere yet, but it does test the user controller
    console.log("Succesful post to /signup!");
    currentUser = JSON.parse(req.body);
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
    // Should handle both get and post? or just one...
    console.log("Retrieving timesheets");
    try {
    var request = JSON.parse(req.body);
        console.log("REQUEST " + JSON.stringify(request));
        if (request.userID !== parseInt(request.userID, 10)) {
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
                console.log("line 194");
                console.log("line 195", timesheets); //Debug
                res.send(JSON.stringify(timesheets));
                next();
            });
        }
    } catch (err) {
        return console.error(err); //Debug
    }
});

server.on('/api/timesheet', function(req, res, next){
    var timesheetObj;
    var userID = getUserID(token);

    res.setHeader('X-ACCESS-TOKEN', verify);
    if (!verify) {
        res.writeHead(401, {
            'Content-Type': 'application/json'
        });
        res.write(JSON.stringify({
            "message": "invalid security token"
        }));
        res.end();
        return;
    }
    try {
        timesheetObj = JSON.parse(data);
    } catch (err) {
        console.err(err); //Debug
    }
    console.log("timesheetObj", timesheetObj);
    if (userID !== parseInt(userID, 10)) {
        res.writeHead(400, {
            'Content-Type': 'application/json'
        });
        res.write(JSON.stringify({
            "message": "Invalid user ID"
        }));
    } else {
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });

        timesheet.createTimesheet(timesheetObj, function(message) {
            if (data) {
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                });
                console.log("line 235", message); //Debug
                res.write(JSON.stringify(message));
                res.end();
            }
        });
    }
});
server.get(/.*/, restify.serveStatic({
    directory: __dirname + "/app/public",
    file: 'index.html'
}));
// app.get('/', siteController.index);
// app.get('/detail', siteController.detail);
//
// // admin routes
// app.get('/admin', adminController.admin);
/////////////////////////////////////////////////////////////////////////////
//
//  Helper funcitons
//
////////////////////////////////////////////////////////////////////////////
