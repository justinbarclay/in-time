var querystring = require('querystring'),
    user = require('./app/controllers/user'),
    fs = require('fs'),
    url = require('url');



function route(req, res){
    //A very basic router that will parse the pathname out of the request object
    //and then send back a response object with some information

    var path = url.parse(req.url, true).pathname;
    console.log(path);
    if(path === '/') {
        // Load the home page
        console.log("Path: " + path);
        fs.readFile('app/public/index.html',function (err, data){
          res.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
          res.write(data);
          res.end();
        });
        console.log('Successful test');


    } else if (path === '/login') {
      //Attempt to login
      //This doesn't go anywhere yet, but it does test the user controller
        console.log("Succesful post to /login!");
        var data = '';

        req.on("data", function(chunk){
            data += chunk;
        });

        req.on("end", function(){
            currentUser = querystring.parse(data);
            user.authenticate(currentUser.username, currentUser.password, function(err, bool){
            if (err){
              console.error(err);
            } else {
              console.log("Succesful login status of " + currentUser.username + " = " + bool);
            }
            });
            res.write("Success!");
            res.end();
        });
    } else if (path === '/signup') {
      //Attempt to login
      //This doesn't go anywhere yet, but it does test the user controller
        console.log("Succesful post to /signup!");
        var signUp = '';

        req.on("data", function(chunk){
            signUp += chunk;
        });

        req.on("end", function(){
            currentUser = querystring.parse(data);
            //hard coded email for testing
            user.signUpUser(currentUser.username, currentUser.password, "test@email.com", function(err, bool){
            if (err){
              console.error(err);
            } else {
              console.log("Succesful signUp of " + currentUser.username + " = " + bool);
            }
            });
            res.write("You're userID has been created successfully!");
            res.end();
        });
    } else if(path.slice(0,7) === "/public"){
      //server static content out. Including JS and CSS files
      //Unsure of how this will handle image files
      var location = "app/" + path;
      var type =  helper.filetype(path);
      fs.readFile(location, function (err, data){
        if (err) {
          res.write("Error finding file");
          res.end();
        } else {
          res.writeHead(200, {'Content-Type': 'text/' + type,'Content-Length':data.length});
          res.write(data);
          res.end();
        }
      });



    } else  {
      //Base case, I don't have what you're looking
      res.writeHead(404);
      console.log("fail");
      console.log(req.headers);
      console.log(req.body);
      res.end();
    }

}
// A group of helper functions that either make the code in router simpler or more readable
var helper = (function() {
   return {
     filetype: function (paths) {
       return paths.split(".")[1];
     }
   };
})();


module.exports.route = route;
