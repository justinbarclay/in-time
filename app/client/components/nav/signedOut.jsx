var React = require("react");
var Link = require("react-router").Link;
var Router = require("react-router").Router;
var Route = require("react-router").Route;
var demoActions = require("../../actions/demoActions");

var NavSignedOut = React.createClass({
    displayName: "signed out",
    propTypes: {},
    setUpDemo: function(){
        demoActions.loadDemo();
    },
    render: function() {
        return (
            <div className="navigation">
                <Link to="/register" className="nav" >
                    <label>Register</label>
                </Link>
                <Link to="/demo" className="nav" >
                    <label>Demo</label>
                </Link>
                <Link to="/signin" className="nav">
                    <label>Sign In</label>
                </Link>
            </div>
        );
    }
});

module.exports = NavSignedOut;
