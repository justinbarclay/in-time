// ENTRY POINT

// Router
var Router = require("./router");

//CSS
require('./scss/style.scss');

// Fire up the router and attach to DOM
Router.run(document.getElementById("js-content"));
