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
      res.write(fs.readFileSync('app/public/test.html'));

      res.end();
      console.log('Successful test');
  } else {
      res.writeHead(404);
      console.log("fail");
      res.end();
  }
});

server.listen(port);
