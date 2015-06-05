var http = require('http'),
    querystring = require('querystring'),
    router = require('./router'),
    url = require('url');

var port = 8888;

var server = http.createServer(function(req, res){
  var path = url.parse(req.url, true).pathname;
  console.log(path.querystring);
  router(req, res);
});

server.listen(port);