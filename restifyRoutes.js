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
                res.send(JSON.stringify(auth.message));
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
