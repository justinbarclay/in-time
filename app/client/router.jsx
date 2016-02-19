// React
var React = require("react");

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
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;

// On Enter
auth = require('./routes/routerAuth.js');
authStaff = auth.staff;
authSup = auth.sup;

// Declare routes
var routes = (
    <Route component={App}>
      <Route path="/" handler={Home}/>
      <Route path="about" component={About} />
      <Route path="signin" component={SignInForm} />
      <Route path="signup" component={SignUpForm} />
      <Route path="timesheets" handler={Timesheets} onEnter={authStaff} />
      <Route name="timesheet" path="timesheet/:id" component={Timesheet} onEnter={authStaff}/>
      <Route path="staff" component={StaffTracker} onEnter={authSup} />
    </Route>
);

module.exports = {
    run: function(el){
        React.render(<Router>{routes}</Router>, el);
    }
};
