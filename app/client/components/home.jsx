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
                <div>
                    <div className="regContainer">
                        <p>New to Timescape? <br/> </p>
                        <div className="authenticationButtons button">
                            <Link to="register"> Register </Link>
                        </div>
                    </div>
                    <div className ="signinContainer">
                        <p>Returning?</p>
                        <div className="authenticationButtons button">
                            <Link to="signin"> Sign In </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Home;
