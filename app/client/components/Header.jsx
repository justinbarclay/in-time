//React
var React = require("react");
var hashHistory = require('react-router').hashHistory;
var Router = require("react-router");
var ReactDOM = require('react-dom');
var Link = Router.Link;

//Flux
var authStore = require('../stores/authStore');
var authActions = require('../actions/authActions');

//subcomponents
var SignedIn = require("./nav/signedIn");
var SignedOut = require("./nav/signedOut");

var header = React.createClass({
    displayName: "navController",
    propTypes: [],
    mixins: [authStore.mixin],
    getInitialState: function(){
        return({loggedIn: authActions.isLoggedIn()});
    },
    storeDidChange: function(){
        var loggedIn = authActions.isLoggedIn();
        var previousLoggedIn = this.state.loggedIn || false;
        this.setState({loggedIn: loggedIn});
        if(loggedIn !== previousLoggedIn){
            if(loggedIn){
                ReactDOM.findDOMNode(this.refs.home).style.display = "none";
                var role = authActions.getUserInfo().role;
                if(role === "Owner"){
                hashHistory.push('/employees');
                } else if (role === "Supervisor"){
                hashHistory.push('/staff');
                } else{
                hashHistory.push('/timesheets/'+authActions.getUserInfo().id);
            }
            } else {
                ReactDOM.findDOMNode(this.refs.home).style.display = 'inherit';
                hashHistory.push('/');
            }
        }
    },
    render: function(){
        nav = this.state.loggedIn ? <SignedIn/> : <SignedOut/>;
        return (
            <div className="header">
                <Link ref="home" className="nav homeButton" to="/">
                    <label>Home</label>
                </Link>
                {nav}
            </div>
        );
    }

});

module.exports = header;
