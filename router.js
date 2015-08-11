var querystring = require('querystring'),
    user = require('./app/server/controllers/user'),
    fs = require('fs'),
    url = require('url'),
    jwt = require("jsonwebtoken");

var config = require("./config.json");

const secret = config.secret;
//shorthand function for verifying JWT
var verifyJWT = function(token) {
    //If JWT is verified return token, otherwise return null
    var state;
    try {
        state = jwt.verify(token, secret);
        console.log("JWT state");
        console.log(state);
        console.log(token);
        return token;
    } catch(err) {
        console.log("JWT err");
        console.log(err);
        console.log(token);
        return null;
    }
};

//With this router, we only want to pass the necessary data into the controoller
//and leave the res and req objects in the router context. This may mean that the
//controllers pass back booleans or errors or messages or a new object to indicate
//the state of the data. How a controller indicates this is currently up for debate

function route(req, res) {
    //A very basic router that will parse the pathname out of the request object
    //and then send back a response object with some information

    var path = url.parse(req.url, true)
        .pathname;
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
        var signUp = '';

        req.on("data", function(chunk) {
            signUp += chunk;
        });

        req.on("end", function() {
            currentUser = JSON.parse(signUp);
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
        console.log("Succesful post to /signup!");
        var signin = '';

        req.on("data", function(chunk) {
            signin += chunk;
        });

        req.on("end", function() {
            currentUser = JSON.parse(signin);
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
                    console.log("Auth message");
                    console.log(auth.message);
                });
        });
    } else if (path === '/JWT') {
        var data = '';
        req.on("data", function(chunk) {
            data += chunk;
        });

        req.on("end", function() {
            headerJWT = req.headers["x-access-token"];
            console.log("headerJWT: " + headerJWT);
            var verify = verifyJWT(headerJWT);
            console.log("JWT");
            if (verify){
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
    } else if (path === '/TIMESHEET' && req.method === "GET") {
        // Should handle both get and post? or just one...
        req.on("data", function(chunk) {
            data += chunk;
        });
        req.on("end", function(){
            console.log("TIMESHEET GET");
        });
    }else if (path === '/TIMESHEET' && req.method === "GET") {
        req.on("data", function(chunk) {
            data += chunk;
        });
        req.on("end", function(){
            console.log("TIMESHEET GET");
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
// A group of helper functions that either make the code in router simpler or more readable
var helper = (function() {
    return {
        filetype: function(paths) {
            return paths.split(".")[1];
        }
    };
})();


module.exports = route;
