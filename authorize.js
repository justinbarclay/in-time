'use strict';
var jwt = require("jsonwebtoken");
var secret = require("./config.js").secret;

function authorize(req, res, next){
    var secure = new Set(['/api/timesheet', '/api/timesheets', '/api/approve', '/api/findTimesheet', '/api/invite', '/api/JWT']);
    var unsecure = ['/api/signin', '/api/signup', '/api/register', '/', /\/public\/?\/?.*/];
    // Read JWT and set RES header as result returned from verifyJWT
    var verify = verifyJWT(req.header('X-ACCESS-TOKEN'));
    console.log(req.url);
    res.setHeader('X-ACCESS-TOKEN', verify);
    console.log(secure.has(req.url));
    if(secure.has(req.url)){
        // if requested path is secure, check for verified JWT
        if(!verify){
            res.redirect(401, "/#/signin", next);
        }
        next();
    } else {
        // Otherwise, no need to care about authorization
        next();
    }

}

module.exports = authorize;

var verifyJWT = function(token) {
    //If JWT is verified return token, otherwise return null
    var state;
    try {
        state = jwt.verify(token, secret);
        return token;
    } catch (err) {
        return null;
    }
};

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
