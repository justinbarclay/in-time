var http = require('http'),
    querystring = require('querystring'),
    fs = require('fs'),
    url = require('url');

var port = 8888;

var server = http.createServer(function(req, res){
  var path = url.parse(req.url, true).pathname;
  console.log(path);
  if(path === '/') {                    //Pseudo code, check the path request and make sure it's base path
      console.log(path);
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(fs.readFileSync('app/public/index.html'));

      res.end();
      console.log('Successful test');
  } else if (path === '/login') {
    console.log("Succesful post!");
    var data = '';
    req.on("data", function(chunk){
      data += chunk;
    });
    req.on("end", function(){
      user = querystring.parse(data);
      console.log(user.username);
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
});

server.listen(port);
