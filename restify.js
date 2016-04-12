var restify = require('restify');
var authorize = require('./authorize');


var server = restify.createServer({
 name: 'MyApp'
});


// server.use(server.router);
server.use(restify.bodyParser());
server.listen(8000);

server.use(function logger(req,res,next) {
  console.log(new Date(),req.method,req.url);
  next();
});

server.use(authorize());
server.on('uncaughtException',function(request, response, route, error){
  console.error(error.stack);
  response.send(error);
});

exports.server = server;
routes = require('./restifyRoutes');
