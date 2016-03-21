// React
var React = require("react");
var render = require("react-dom").render;

//Main components for Timesheet app
var App = require("./components/app");
var SignInForm = require("./components/SignInForm");
var SignUpForm = require("./components/SignUpForm");
var SignUpOrg = require("./components/signUpOrg");
var Timesheet = require("./components/timesheet");
var Timesheets = require("./components/timesheets");
var StaffTracker = require("./components/staffTracker");
var Home = require("./components/home");
var NotFound = require("./components/notfound");
var About = require("./components/about");
var Admin = require("./components/admin");
var Register = require("./components/register");

// Set up Router object
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var hashHistory = ReactRouter.hashHistory;
// On Enter
auth = require('./routes/routerAuth.js');
authStaff = auth.staff;
authSup = auth.sup;

// Declare routes
var routes = (
    <Route component={App}>
      <Route path="/" component={Home}/>
      <Route path="about" component={About} />
      <Route path="signin" component={SignInForm} />
      <Route path="signup/:code" component={SignUpForm} />
      <Route path="timesheets" component={Timesheets} onEnter={authStaff}/>
      <Route path="timesheet/:id" component={Timesheet} onEnter={authStaff}/>
      <Route path="staff" component={StaffTracker} onEnter={authSup} />
      <Route path="admin" component={Admin} onEnter={authStaff}/>
      <Route path="register" component={Register}/>
      <Route path="register/admin" component={SignUpOrg}/>
      <Route path="*" component={NotFound}/>
    </Route>
);

module.exports = {
    run: function(el){
         render(<Router history={hashHistory}>{routes}</Router>, el);
    }
};
