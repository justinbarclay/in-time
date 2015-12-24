var http = require('http'),
    querystring = require('querystring'),
    router = require('./router'),
    url = require('url'),
    port = require('./config.js').port;


var server = http.createServer(function(req, res){
  var path = url.parse(req.url, true).pathname;
  console.log(path.querystring);
  router(req, res);
});
console.log("Server listening on port:" + port);
try{
    server.listen(port);
} catch (err) {
    console.error(err);
}
