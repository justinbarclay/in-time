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

    user.authenticate(currentUser, function(data) {
        if (data.err) {
            res.send(data.auth);
            console.error(data.err);
            next();
        } else {
            console.log("Succesful signin of " +
                currentUser.email + " = " + data.auth
                .success);
            console.log("Message:" + JSON.stringify(
                    data.auth.message));
            res.setHeader('X-ACCESS-TOKEN', data.signedJWT || null);
            res.send(data.auth);
            next();
        }
    });
});

server.post('/api/signup', function(req, res, next){
    //Attempt to login
    //This doesn't go anywhere yet, but it does test the user controller
    console.log("Succesful post to /signup!");
    signup = req.body;
    console.log(signup);

    user.signUp({user:{password:signup.password, email: signup.email}, code: signup.code},
        function(data) {
            console.log(data);
            if (data.err) {
                res.writeHead(400, {
                    'Content-Type': 'application/json'
                });
                res.send(
                    "There was an error talking to the server"
                );
                console.error(data.err);
                return next();
            } else {
                console.log("Succesful signUp of " +
                    signup.email + " = " + !data.err
                );
                user.authenticate(signup, function(data) {
                    if (data.err) {
                        res.send(data.auth);
                        console.error(data.err);
                        next();
                    } else {
                        console.log("Succesful signin of " +
                            signup.email + " = " + data.auth
                            .success);
                        console.log("Message:" + JSON.stringify(
                                data.auth.message));
                        res.setHeader('X-ACCESS-TOKEN', data.signedJWT || null);
                        res.send(data.auth);
                        next();
                    }
                });
        }
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
            res.json({"message": "Invalid user ID"});
            next();
            return;
        } else {
            timesheet.getTimesheets(request, function(timesheets) {
                res.header('Content-Length', Buffer.byteLength(timesheets));
                res.json(timesheets);
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
    var userID = getUserID(res.header('X-ACCESS-TOKEN'));
    console.log("User ID: " + userID);
    try {
        timesheetObj = JSON.parse(req.body);
        timesheetObj.userID = userID;
    } catch (err) {
        console.error(err); //Debug
    }
    if (isNaN(parseFloat(userID)) && !isFinite(userID)) {
        res.writeHead(400, {
            'Content-Type': 'application/json'
        });
        res.json({message: "Invalid user ID", success:false});
        return next();
    } else {
        timesheet.createTimesheet(timesheetObj, function(data) {
            console.log("Message " + data.message + data.success);
            if (data.message) {
                res.json({"message":data.message, "success":data.success});
            }
            console.log("Done");
            next();
        });
    }
});

server.post('/api/approve', function(req, res, next){
        token = req.headers["x-access-token"];
        var timesheetID;
        var userID = getUserID(req.header('X-ACCESS-TOKEN'));

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
            res.json(JSON.stringify({
                "message": "Invalid user ID"
            }));
            return next();
        } else {
            approve.userID = userID;
            timesheet.approveTimesheet(approve, function(message) {
                if(message.err){
                    res.json({success:false, message: message.message});
                    next();
                } else {
                    res.json({success:true, message: message.message});
                    next();
                }
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
            res.json(JSON.stringify({
                "message": "Invalid user ID"
            }));
            return next();
        } else {
            timesheet.getTimesheets(request, function(timesheets) {
                res.json(timesheets);
                next();
            });
        }
});

server.post('/api/employee', function(req, res, next){
    try{
        data = JSON.parse(req.body);
        owner.updateEmployee(data, function(data){
            message = {message: data.message, success: data.success};
            res.json(data);
            next();
        });
    } catch(e){
        console.error(e);
    }

});

server.post('/api/invite', function(req, res, next){
        data = JSON.parse(req.body);
        var code = uuid();
        invite(data.id, data.email, data.role, code, function(err, data) {
            console.log(data);
            console.log(!err);
            message = {message: data.message, success: data.success };
            res.json(message);
            next();
        });
});

server.post('/api/allemployees', function(req, res, next){
        thing = JSON.parse(req.body);
        owner.getAllEmployees(thing, function(data) {
            if(data.err){
                res.json({success: false, message: data.message});
                next();
            } else {
                res.header('Content-Length', Buffer.byteLength(data));
                res.json(data);
                next();
            }
        });
});

server.post('/api/employees', function(req, res, next){
        supervisorID = JSON.parse(req.body);
        owner.getEmployees(supervisorID, function(data) {
            console.log(data);
            if(data.err){
                res.json({success: false, message: data.message});
                next();
            } else {
                res.json(data);
                next();
            }
         });
});

server.post('/api/register', function(req, res, next){
    var register = req.body;
    var message;
    owner.addOrganization(register, function(result){
        if(result.err){
            message = "Unable to register organization, please try again later or contact the system administrator";
            result.message = message;
            res.send({message: message});
            next();
        } else {
            var currentUser = register.user;
            user.authenticate(currentUser, function(data) {
                if (data.err) {
                    res.send(data.auth);
                    console.error(data.err);
                    next();
                } else {
                    console.log("Succesful signin of " +
                        currentUser.email + " = " + data.auth
                        .success);
                    console.log("Message:" + JSON.stringify(
                            data.auth.message));
                    res.setHeader('X-ACCESS-TOKEN', data.signedJWT || null);
                    res.send(data.auth);
                    next();
                }
            });
        }
    });
});

server.post('/api/JWT', function(req, res, next){
        if(res.header('X-ACCESS-TOKEN')){
            var userID = getUserID(res.header('X-ACCESS-TOKEN'));
            user.grabInfo({id:userID}, function(data){
                res.send(data.auth);
                next();
            });
        } else {
            next();
        }
});

server.post('/api/getstaff', function(req, res, next){
        if(res.header('X-ACCESS-TOKEN')){
            var userID = getUserID(res.header('X-ACCESS-TOKEN'));
            supervisor.getStaff({id:userID}, function(staff){
                res.json(staff);
                next();
            });
        } else {
            next();
        }
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
