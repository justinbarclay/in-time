function authorize(obj){
        var unsecure = ['/api/signin', '/api/signup', '/api/regiter', '/', /\/public\/?\/?.*/];
        return function(req, res, next){
            for(var i=0; i<unsecure.length; i++){
                if(unsecure[i] === req._url.pathname){
                    console.log("A match");
                    console.log(req._url.pathname);
                    break;
                }
            }
            console.log("headers");
            console.log(req.headers['x-access-token']);
            console.log(JSON.stringify(Object.keys(req)));
            next();
        };
}

module.exports = authorize;

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
