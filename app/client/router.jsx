// React
var React = require("react");
var render = require("react-dom").render;

//Main components for Timesheet app
var App = require("./components/app");
var SignInForm = require("./components/SignInForm");
var SignUpForm = require("./components/SignUpForm");
var SignUpOrg = require("./components/signUpOrg");
var StaffTracker = require("./components/staffTracker");
var Timesheet = require("./components/timesheetcontainer");
var Timesheets = require("./components/timesheets");
var Demo = require("./components/demo");
var Home = require("./components/home");
var NotFound = require("./components/notfound");
var About = require("./components/about");
var Owner = require("./components/owner");
var Register = require("./components/register");
var Employees = require("./components/Employees");
var TimesheetRow = require("./components/mobileTimesheet/m-timesheetedit");
var TimesheetRows = require("./components/mobileTimesheet/m-timesheetrows");

// Set up Router object
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var hashHistory = ReactRouter.hashHistory;
// On Enter
auth = require('./routes/routerAuth.js');
authStaff = auth.staff;
authSup = auth.sup;

// Declare routes
var routes = (
    <Route component={App}>
      <Route path="/" component={Home}/>
      <Route path="demo" component={Demo} />
      <Route path="about" component={About} />
      <Route path="signin" component={SignInForm} />
      <Route path="signup/:code" component={SignUpForm} />
      <Route path="timesheets/:userID" component={Timesheets} onEnter={authStaff}/>
      <Route path="timesheet/:userID/:id" component={Timesheet} onEnter={authStaff}>
          <IndexRoute component={TimesheetRows}/>
          <Route path=":row" component={TimesheetRow}/>
      </Route>
      <Route path="staff" component={StaffTracker} onEnter={authSup} />
      <Route path="invite" component={Owner} onEnter={authStaff}/>
      <Route path="register" component={Register}/>
      <Route path="register/admin" component={SignUpOrg}/>
      <Route path="employees" component={Employees} onEnter={authSup}/>
      <Route path="*" component={NotFound}/>
    </Route>
);

module.exports = {
    run: function(el){
        console.log(hashHistory);
         render(<Router history={hashHistory} routes={routes}/>, el);
    }
};
