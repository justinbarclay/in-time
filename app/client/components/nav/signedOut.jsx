var React = require("react");
var Link = require("react-router").Link;
var Router = require("react-router").Router;
var Route = require("react-router").Route;

var NavSignedOut = React.createClass({
    displayName: "signed out",
    propTypes: {},
    render: function() {
        return (
            <div className="navigation">
                <Link to="/register" className="nav" >
                    <label>Register</label>
                </Link>
                <Link to="/signin" className="nav">
                    <label>Sign In</label>
                </Link>
            </div>
        );
    }
});

module.exports = NavSignedOut;
