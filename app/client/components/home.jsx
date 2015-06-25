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
                <p> Something else</p>
                <div className="authenticationButtons">
                    <Link to="signup"><button className="signupButton">Signup</button></Link>
                    <Link to="signin"><button className="signinButton">Signin</button></Link>
                </div>
            </div>
        );
    }
});

module.exports = Home;
