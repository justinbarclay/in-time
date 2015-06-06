// React
var React = require("react");
var Router = require("react-router");
var App = require("./components/app");
var SignInForm = require("./components/SignInForm");
var Home = require("./components/home");
var NotFound = require("./components/notfound");

// Set up Router object
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;

// Declare routes
var routes = (
  <Route handler={App} path="/">
    <DefaultRoute name="app" handler={Home} />
    <Route name="signin" handler={SignInForm} />
    <NotFoundRoute handler={NotFound} />
  </Route>
);

module.exports = {
    run: function(el){
        Router.run(routes, function (Handler, state) {
            var params = state.params;
            React.render(<Handler params={params} />, el);
        });
    }
};
