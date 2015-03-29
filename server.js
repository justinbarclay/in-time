var http = require('http'),
    querystring = require('querystring'),
    router = require('./router'),
    fs = require('fs'),
    url = require('url');

var port = 8888;

var server = http.createServer(function(req, res){
  var path = url.parse(req.url, true).pathname;
  console.log(path.querystring);
  router.route(req, res);
});

server.listen(port);
