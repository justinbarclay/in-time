var querystring = require('querystring');
var    user = require('./app/server/controllers/user');
var    timesheet = require('./app/server/controllers/timesheet');
var    fs = require('fs');
var    url = require('url');
var    jwt = require("jsonwebtoken");

var config = require("./config.js");

const secret = config.secret;

//shorthand function for verifying JWT
var verifyJWT = function(token) {
    //If JWT is verified return token, otherwise return null
    var state;
    try {
        state = jwt.verify(token, secret);
        return token;
    } catch (err) {
        console.log("JWT err");
        console.log(err);
        console.log(token);
        return null;
    }
};

var getuserID = function(token) {
    var state;
    try {
        state = jwt.verify(token, secret);
        return state.userid;
    } catch (err) {
        console.log(err);
        return null;
    }


}

//With this router, we only want to pass the necessary data into the controller
//and leave the res and req objects in the router context. This may mean that
//the controllers pass back booleans or errors or messages or a new object to
//indicate the state of the data. How a controller indicates this is currently
//up for debate

function route(req, res) {
    //A very basic router that will parse the pathname out of the request object
    //and then send back a response object with some information
    var data = '';
    var path = url.parse(req.url, true)
        .pathname;
    var request;
    var token;

    console.log(path);
    if (path === '/') {
        // Load the home page
        console.log("Path: " + path);
        fs.readFile('app/public/index.html', function(err, data) {
            res.writeHead(200, {
                'Content-Type': 'text/html',
                'Content-Length': data.length
            });
            res.write(data);
            res.end();
        });
        console.log('Successful test');
    } else if (path === '/signup') {
        //Attempt to login
        //This doesn't go anywhere yet, but it does test the user controller
        console.log("Succesful post to /signup!");

        req.on("data", function(chunk) {
            data += chunk;
        });

        req.on("end", function() {
            currentUser = JSON.parse(data);
            //hard coded email for testing
            console.log(currentUser);
            user.signUp(currentUser.username, currentUser.password,
                currentUser.email,
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
                            currentUser.username + " = " + bool
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
    } else if (path === '/signin') {
        //Attempt to login
        //This doesn't go anywhere yet, but it does test the user controller
        req.on("data", function(chunk) {
            data += chunk;
        });

        req.on("end", function() {
            currentUser = JSON.parse(data);
            console.log(currentUser.username);
            //hard coded email for testing
            user.authenticate(currentUser.username, currentUser.password,
                function(err, auth, signedJWT) {
                    if (err) {
                        res.write(auth.message);
                        console.error(err);
                        res.end();
                    } else {
                        console.log("Succesful signUp of " +
                            currentUser.username + " = " + auth
                            .success);
                        console.log("Message:" + JSON.stringify(
                                auth.message) + "\n" +
                            "message length: " + auth.length);
                        /* This header needs to reworked so that it reports the length properly, otherwise AJAX acts weird
                        res.writeHead(200, {'Content-Type': 'application/json','Content-Length':message.length}); */
                        res.setHeader('X-ACCESS-TOKEN', signedJWT || null);
                        auth = JSON.stringify(auth);
                        res.writeHead(200, {
                            'Content-Type': 'application/json',
                            'Content-Length': auth.length
                        });
                        res.write(auth);

                        console.log('response sent');
                        console.log(res.headers);
                        res.end();
                    }
                    console.log("Auth message", auth.message);
                });
        });
    } else if (path === '/JWT') {
        req.on("data", function(chunk) {
            data += chunk;
        });

        req.on("end", function() {
            headerJWT = req.headers["x-access-token"];
            console.log("headerJWT: " + headerJWT);
            var verify = verifyJWT(headerJWT);
            console.log("JWT");
            if (verify) {
                res.setHeader('X-ACCESS-TOKEN', verify);
            }

            res.writeHead(200, {
                'Content-Type': 'application/text'
            });
            console.log("verify " + verify);
            res.write(verify ? "Token verified" : "illegal token");
            res.end();
            console.log("res sent");
        });
    } else if (path === '/timesheets' && req.method === "POST") {
        // Should handle both get and post? or just one...
        req.on("data", function(chunk) {
            console.log("chunk", data);
            data += chunk;
        });
        req.on("end", function() {
            console.log("made it into callback");
            var verify = verifyJWT(req.headers["x-access-token"]);
            if (!verify) {
                res.writeHead(401, {
                    'Content-Type': 'application/json'
                });
                console.log("not verified");
                res.write(JSON.stringify({
                    "message": "invalid security token"
                }));
                return;
            }

            try {
                request = JSON.parse(data);
            } catch (err) {
                console.err(err); //Debug
            }
            if (request.userID !== parseInt(request.userID, 10)) {
                res.writeHead(400, {
                    'Content-Type': 'application/json'
                });
                res.write(JSON.stringify({
                    "message": "Invalid user ID"
                }));
                return;
            } else {

                timesheet.getTimesheets(request, function(timesheets) {
                    console.log("line 194");
                    // console.log("res", res);
                    // res.writeHead(200, {
                    //     'Content-Type': 'application/json'
                    // });
                    res.setHeader('X-ACCESS-TOKEN', verify);
                    // console.log("res", res);
                    console.log("line 195", timesheets); //Debug
                    res.write(JSON.stringify(timesheets));
                    res.end();
                    // }
                });
            }
        });
    } else if (path === '/timesheet' && req.method === "POST") {
        req.on("data", function(chunk) {
            console.log("chunk", chunk);
            data += chunk;
        });

        req.on("end", function() {
            token = req.headers["x-access-token"];
            var verify = verifyJWT(req.headers["x-access-token"]);
            var timesheetObj;
            var userID = getuserID(req.headers["x-access-token"]);

            res.setHeader('X-ACCESS-TOKEN', verify);
            if (!verify) {
                res.writeHead(401, {
                    'Content-Type': 'application/json'
                });
                res.write(JSON.stringify({
                    "message": "invalid security token"
                }));
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
                timesheet.userID = userID;

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
    } else if (path.slice(0, 7) === "/public") {
        //server static content out. Including JS and CSS files
        //Unsure of how this will handle image files
        var location = "app/" + path;
        var type = helper.filetype(path);
        fs.readFile(location, function(err, data) {
            if (err) {
                res.write("Error finding file");
                res.end();
            } else {
                res.writeHead(200, {
                    'Content-Type': 'text/' + type,
                    'Content-Length': data.length
                });
                res.write(data);
                res.end();
            }
        });



    } else {
        //Base case, I don't have what you're looking
        res.writeHead(404);
        console.log("route fail");
        console.log(req.headers);
        console.log(req.body);
        res.end();
    }

}
// A group of helper functions that either make the code in router simpler or more
//readable

var helper = (function() {
    return {
        filetype: function(paths) {
            return paths.split(".")[1];
        }
    };
})();


module.exports = route;
