var http = require('http'),
    querystring = require('querystring'),
    router = require('./router'),
    url = require('url'),
    port = require('./config.js').port,
    browserSync = require('browser-sync');


var server = http.createServer(function(req, res){
  var path = url.parse(req.url, true).pathname;
  console.log(path.querystring);
  router(req, res);
});
console.log("Server listening on port:" + port);
server.listen(port, listening());

function listening () {
  browserSync({
    proxy: 'localhost:' + port,
    files: ['./app/public/**/*.{js,css}'],
    logLevel: 'debug',
    open: false
  });
}
