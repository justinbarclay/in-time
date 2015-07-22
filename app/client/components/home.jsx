// React
var React = require("react");

//Components
var Signin = require("./SignInForm");
var Signup = require("./SignUpForm");

// Router
var Router = require("react-router");
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;

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
                <div className="authenticationButtons">
                    Welcome, please sign in!
                </div>
            </div>
        );
    }
});

module.exports = Home;
