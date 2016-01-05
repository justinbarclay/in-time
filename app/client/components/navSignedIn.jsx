var React = require("react");
var Router = require("react-router");
var Link = Router.Link;
var Navigation = Router.Navigation;
var authActions = require("../actions/authActions");
var timesheetActions = require("../actions/timesheetActions");

var NavSignedIn = React.createClass({
    displayName: "nav2",
    propTypes: {},
    mixins: [Navigation],
    signOut: function(){
        authActions.signOut();
    },
    componentDidMount: function(){
        id = authActions.getUserInfo().id;
        timesheetActions.syncTimesheets(id);
    },
    componentWillUnmount: function(){
        timesheetActions.deleteTimesheets();
        this.transitionTo("home");
    },
    render: function() {
        return (
            <div className="navigation">
                <Link className="nav" to="about">
                    <label>About</label>
                </Link>
                <Link className="nav" to="timesheets">
                    <label>Timesheets</label>
                </Link>
                <a className="nav" onClick={this.signOut}>
                    <label>Sign Out</label>
                </a>
            </div>
        );
    }
});

module.exports = NavSignedIn;
