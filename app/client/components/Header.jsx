//React
var React = require("react");
var hashHistory = require('react-router').hashHistory;
var Router = require("react-router");
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
                var role = authActions.getUserInfo().role;
                if(role === "Owner"){
                hashHistory.push('/employees');
                } else if (role === "Supervisor"){
                hashHistory.push('/staff');
                } else{
                hashHistory.push('/timesheets/'+authActions.getUserInfo().id);
            }
            } else {
                hashHistory.push('/');
            }
        }
    },
    render: function(){
        nav = this.state.loggedIn ? <SignedIn/> : <SignedOut/>;
        return (
            <div className="header">
                <Link className="nav homeButton" to="/">
                    <label>Home</label>
                </Link>
                {nav}
            </div>
        );
    }

});

module.exports = header;
