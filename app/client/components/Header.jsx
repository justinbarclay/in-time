//React
var React = require("react");

//Flux
var authStore = require('../stores/authStore');
var authActions = require('../actions/authActions');

//subcomponents
var NavSignedIn = require("./navSignedIn");
var NavSignedOut = require("./navSignedOut");

var nav = React.createClass({
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
        if (this.state.signedIn === true){
            nav = <NavSignedIn />;
        } else {
            nav = <NavSignedOut />;
        }
        return (
            <div className="header">
                {nav}
            </div>
        );
    }

});

module.exports = nav;
