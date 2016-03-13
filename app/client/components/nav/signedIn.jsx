var React = require("react");
var ReactRouter = require("react-router");
var Link = ReactRouter.Link;
var hashHistory = require('react-router').hashHistory;
var authActions = require("../../actions/authActions");
var timesheetActions = require("../../actions/timesheetActions");
var authStore = require('../../stores/authStore.js');

var NavSignedIn = React.createClass({
    displayName: "signed in",
    propTypes: {},
    mixins: [authStore.mixin],

    getInitialState: function(){
        return({
            role: authActions.getUserInfo().role
        });
    },
    signOut: function(){
        authActions.signOut();
    },
    storeDidChange: function(){
        this.setState({
            role: authActions.getUserInfo().role
        });
    },
    componentDidMount: function(){
        id = authActions.getUserInfo().id;
        timesheetActions.syncTimesheets(id);
    },
    componentWillUnmount: function(){
        timesheetActions.deleteTimesheets();
        hashHistory.push("home");
    },
    changeRole: function(){
        newRole = this.state.role === "Supervisor" ? "Staff" : "Supervisor";
        authActions.changeRole(newRole);
    },
    staffButton: function(){
        return (
            <Link className="nav" to="staff">
                <label>Staff</label>
            </Link> );
    },
    render: function() {
        var staff = this.state.role === "Supervisor" ? this.staffButton() : null;
        return (
            <div className="navigation">
                <label className="nav role" onClick={this.changeRole}>{this.state.role}</label>
                <Link to="/about" className="nav">
                    <label>About</label>
                </Link>
                <Link className="nav" to="/timesheets">
                    <label>Timesheets</label>
                </Link>
                {staff}
                <a className="nav" onClick={this.signOut}>
                    <label>Sign Out</label>
                </a>

            </div>
        );
    }
});

module.exports = NavSignedIn;
