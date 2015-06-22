// React
var React = require("react");
var Router = require("react-router");
var App = require("./components/app");
var SignInForm = require("./components/SignInForm");
var SignUpForm = require("./components/SignUpForm");
var Home = require("./components/home");
var NotFound = require("./components/notfound");
var About = require("./components/about");

// Set up Router object
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;

// Declare routes
var routes = (
  <Route handler={App} path="/">
    <DefaultRoute name="home" handler={Home} />
    <Route name="about" handler={About} />
    <Route name="signin" handler={SignInForm} />
    <Route name="signup" handler={SignUpForm} />
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
