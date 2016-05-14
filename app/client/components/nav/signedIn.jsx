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
        var role = authActions.getUserInfo().role;
        var links = this.genLinks(this.genLinkArray(role));
        return({
            role: role,
            links: links
        });
    },
    storeDidChange: function(){
        console.log("JWT: ", localStorage.getItem("JWT"));
        if(localStorage.getItem("JWT") === "null"){
            authActions.signOut();
        }
        role = authActions.getUserInfo().role;
        this.setState({
            role: role
        });
    },
    componentDidMount: function(){
        id = authActions.getUserInfo().id;
        timesheetActions.syncTimesheets(id);
    },
    componentWillUnmount: function(){
        hashHistory.push("/");
    },
    signOut: function(){
        authActions.signOut();
    },
    genLinkArray: function(role){
        var owner = [{route:"/invite", label:"Invite"}, {route:"/", label:"Employees"}];
        var supervisor = [{route:"/staff", label: "Staff"}];
        var base = [{route:"/timesheets", label:"Timesheets"},{route: "/about", label:"About"}];
        var links = [];
        if(role === "Staff"){
            links = base;
        } else if (role === "Supervisor"){
            links = supervisor.concat(base);
        } else if (role === "Owner"){
            links = owner.concat(base.slice(1,2));
        }
        console.log(links);
        return links;
    },
    genLinks: function(data){
        var links = data.map(function(link, index){
            return (<Link to={link.route} className="nav" key={index}>
                <label>{link.label}</label>
            </Link>);
        });
        return links;
    },
    render: function() {
        // console.log(this.state.links);   
        return (
            <div className="navigation">
                {this.state.links}
                <a className="nav" onClick={this.signOut}>
                    <label>Sign Out</label>
                </a>

            </div>
        );
    }
});

module.exports = NavSignedIn;
