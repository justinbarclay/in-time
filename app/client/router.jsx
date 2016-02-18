// React
var React = require("react");
var Router = require("react-router");

//Main components for Timesheet app
var App = require("./components/app");
var SignInForm = require("./components/SignInForm");
var SignUpForm = require("./components/SignUpForm");
var Timesheet = require("./components/timesheet");
var Timesheets = require("./components/timesheets");
var StaffTracker = require("./components/staffTracker");
var Home = require("./components/home");
var NotFound = require("./components/notfound");
var About = require("./components/about");

// Set up Router object
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;

// On Enter
auth = require('./router/routerAuth.js');
confirmAuth = require('./router/protectedNav.js').staff;
confirmSup = require('./router/protectedNav.js').sup;

// Declare routes
var routes = (
  <Route handler={App} path="/">
    <DefaultRoute name="home" handler={Home} />
    <Route name="about" handler={About} />
    <Route name="signin" handler={SignInForm} />
    <Route name="signup" handler={SignUpForm} />
    <Route name="timesheets" handler={Timesheets} onEnter={confirmStaff} />
    <Route name="timesheet" path="timesheet/:id" handler={Timesheet} onEnter={confirmStaff}/>
    <Route name="staff" handler={StaffTracker} onEnter={confirmSup} />
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
