var React = require("react");
var Router = require("react-router");
var Link = Router.Link;
var authActions = require("../actions/authActions");
var timesheetActions = require("../actions/timesheetActions");

var NavSignedIn = React.createClass({
    displayName: "nav2",
    propTypes: {},
    mixins: [],
    signOut: function(){
        console.log("Sign out");
        authActions.signOut();
    },
    componentWillUnmount: function(){
        timesheetActions.deleteTimesheets();
    },
    render: function() {
        return (
            <div className="navigation">
                <Link className="nav" to="home">
                    <label>Home</label>
                </Link>
                <Link className="nav" to="about">
                    <label>About</label>
                </Link>
                <Link className="nav" to="timesheet">
                    <label>Timesheet</label>
                </Link>
                <a className="nav" onClick={this.signOut}>
                    <label>Sign Out</label>
                </a>
            </div>
        );
    }
});

module.exports = NavSignedIn;
