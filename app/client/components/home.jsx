// React
var React = require("react");

//Components
var Signin = require("./SignInForm");
var Signup = require("./SignUpForm");
var Logo = require("./home/logo");
// Router
var Router = require("react-router");
var Link = Router.Link;

// Component
var Home = React.createClass({
    displayName: "Home",
    propTypes: {},
    mixins: [],
    getInitialState: function () {
        return null;
    },

    componentWillMount: function () {},

    componentWillUnmount: function () {},

    render: function () {
        return (
            <div className="home">
                <Logo/>
                <div className="authenticationButtons">
                    <Link to="signin"> Sign In </Link>
                </div>
            </div>
        );
    }
});

module.exports = Home;
