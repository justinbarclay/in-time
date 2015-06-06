var http = require('http'),
    querystring = require('querystring'),
    router = require('./router'),
    url = require('url'),
    port = require('./config.json').port;


var server = http.createServer(function(req, res){
  var path = url.parse(req.url, true).pathname;
  console.log(path.querystring);
  router(req, res);
});

server.listen(port);
