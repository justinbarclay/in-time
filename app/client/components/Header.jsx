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
        return({signedIn: authActions.isLoggedIn()});
    },
    storeDidChange: function(){
        var loggedIn = authActions.isLoggedIn();
        this.setState({signedIn: loggedIn});
        if(loggedIn){
            hashHistory.push('/timesheets');
        } else {
            //hashHistory.push('/');
        }
    },
    render: function(){
        nav = this.state.signedIn ? <SignedIn/> : <SignedOut/>;
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
