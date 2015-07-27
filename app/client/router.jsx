// React
var React = require("react");
var Router = require("react-router");

//Main components for Timesheet app
var App = require("./components/app");
var SignInForm = require("./components/SignInForm");
var SignUpForm = require("./components/SignUpForm");
var Timesheet = require("./components/timesheet");
var Timesheets = require("./components/timesheets");
var Home = require("./components/home");
var NotFound = require("./components/notfound");
var About = require("./components/about");

// Set up Router object
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;


// <Route name="timesheet" handler={timesheet} />
// Declare routes
var routes = (
  <Route handler={App} path="/">
    <DefaultRoute name="home" handler={Home} />
    <Route name="about" handler={About} />
    <Route name="signin" handler={SignInForm} />
    <Route name="signup" handler={SignUpForm} />
    <Route name="timesheets" handler={Timesheets} />
    <Route name="timesheet" handler={Timesheet} path="/timesheet/:id" />
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
