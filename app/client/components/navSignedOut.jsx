var React = require("react");
var Router = require("react-router");
var Link = Router.Link;

var NavSignedOut = React.createClass({
    displayName: "signed out",
    propTypes: {},
    mixins: [],
    render: function() {
        return (
            <div className="navigation">
                <Link className="nav" to="signup">
                    <label>Sign Up</label>
                </Link>
                <Link className="nav" to="signin">
                    <label>Sign In</label>
                </Link>
            </div>
        );
    }
});

module.exports = NavSignedOut;
