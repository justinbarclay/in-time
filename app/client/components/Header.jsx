//React
var React = require("react");
var Router = require("react-router");
var Link = Router.Link;

//Flux
var authStore = require('../stores/authStore');
var authActions = require('../actions/authActions');

//subcomponents
var NavSignedIn = require("./navSignedIn");
var NavSignedOut = require("./navSignedOut");

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
        var nav;
        if (this.state.signedIn){
            nav = <NavSignedIn />;
        } else {
            nav = <NavSignedOut />;
        }
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
