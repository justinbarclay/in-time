var http = require('http'),
    querystring = require('querystring'),
    user = require('./app/controllers/user'),
    fs = require('fs'),
    url = require('url');

var port = 8888;

var server = http.createServer(function(req, res){
  var path = url.parse(req.url, true).pathname;
  console.log(path.querystring);
  router(req, res);
});

server.listen(port);

var router = function (req, res){
    var path = url.parse(req.url, true).pathname;
    if(path === '/') {                    //Pseudo code, check the path request and make sure it's base path
        console.log("Path: " + path);
        fs.readFile('app/public/index.html',function (err, data){
          res.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
          res.write(data);
          res.end();
        });

        /**
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.readFile('app/public/index.html', "utf8", function (err, data){
            if (err){
                res.write("Error", err);
                console.error("Error on reading index file on '/' route ", err);
            }else {
                console.log(data);
                res.write(data);
                res.end();
            }


        });
        **/
        console.log('Successful test');
    } else if (path === '/login') {
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
    } else  {
      res.writeHead(404);
      console.log("fail");
      console.log(req.headers);
      console.log(req.body);
      res.end();
}
};
