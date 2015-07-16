//React
var React = require("react");
var authStore = require('../stores/authStore');

//subcomponents
var NavSignedIn = require("./navSignedIn");
var NavSignedOut = require("./navSignedOut");

var TSHeader = React.createClass({
    displayName: "navController",
    propTypes: [],
    mixins: [authStore.mixin],
    getInitialState: function(){
        return({signedIn: authStore.getUserInfo().signedIn});
    },
    storeDidChange: function(){
        console.log("store changed");
        this.setState({signedIn: authStore.getUserInfo().signedIn});
    },
    render: function(){
        var nav;
        if (this.state.signedIn === true){
            nav = <NavSignedIn />;
        } else {
            nav = <NavSignedOut />;
        }
        return (
            <div className="nav">
                {nav}
            </div>
        );
    }

});

module.exports = TSHeader;
