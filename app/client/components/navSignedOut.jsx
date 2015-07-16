var React = require("react");
var Router = require("react-router");
var Link = Router.Link;

var NavSignedOut = React.createClass({
    displayName: "nav",
    propTypes: {},
    mixins: [],
    render: function() {
        return (
            <div className="navigation">
                <Link className="nav" to="home">
                    <label>Home</label>
                </Link>
                <Link className="nav" to="about">
                    <label>About</label>
                </Link>
                <Link className="nav" to="signin">
                    <label>Sign in</label>
                </Link>
                <Link className="nav" to="signup">
                    <label>Sign up</label>
                </Link>
            </div>
        );
    }
});

module.exports = NavSignedOut;
