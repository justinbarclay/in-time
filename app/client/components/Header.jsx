//React
var React = require("react");
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
        return({signedIn: authActions.authenticated()});
    },
    storeDidChange: function(){
        this.setState({signedIn: authActions.authenticated()});
    },
    render: function(){
        nav = this.state.signedIn ? <SignedIn/> : <SignedOut/>;
        return (
            <div className="header">
                <Link className="nav homeButton" to="home">
                    <label>Home</label>
                </Link>
                {nav}
            </div>
        );
    }

});

module.exports = header;
