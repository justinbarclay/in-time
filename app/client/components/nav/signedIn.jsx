var React = require("react");
var ReactRouter = require("react-router");
var Link = ReactRouter.Link;
var hashHistory = require('react-router').hashHistory;
var authActions = require("../../actions/authActions");
var timesheetActions = require("../../actions/timesheetActions");
var authStore = require('../../stores/authStore.js');
var employeeActions = require('../../actions/employeeActions');

var NavSignedIn = React.createClass({
    displayName: "signed in",
    propTypes: {},
    mixins: [authStore.mixin],
    getInitialState: function(){
        return({
            role: authActions.getUserInfo().role
        });
    },
    storeDidChange: function(){
        if(localStorage.getItem("JWT") === "null"){
            authActions.signOut();
        }
        role = authActions.getUserInfo().role;
        this.setState({
            role: role
        });
    },
    componentDidMount: function(){
        user = authActions.getUserInfo();
        if(user.role === "Owner"){
            employeeActions.syncAllEmployees(user.id);
        } else {
            timesheetActions.syncTimesheets(user.id);
        }
    },
    componentWillUnmount: function(){
        hashHistory.push("/");
    },
    signOut: function(){
        authActions.signOut();
    },
    genLinkArray: function(role){
        var owner = [{route:"/invite", label:"Invite"}, {route:"/employees", label:"Employees"}];
        var supervisor = [{route:"/staff", label: "Staff"}];
        var base = [{route:("/timesheets/"+authActions.getUserInfo().id), label:"Timesheets"},{route: "/about", label:"About"}];
        var links = [];
        if(role === "Staff"){
            links = base;
        } else if (role === "Supervisor"){
            links = supervisor.concat(base);
        } else if (role === "Owner"){
            links = owner.concat(base.slice(1,2));
        }
        return links;
    },
    genLinks: function(data){
        return data.map(function(link, index){
            return (<Link to={link.route} className="nav" key={index}>
                <label>{link.label}</label>
            </Link>);
        });
    },
    render: function() {
        var links = this.genLinks(this.genLinkArray(authActions.getUserInfo().role));
        return (
            <div className="navigation">
                {links}
                <a className="nav" onClick={this.signOut}>
                    <label>Sign Out</label>
                </a>

            </div>
        );
    }
});

module.exports = NavSignedIn;
