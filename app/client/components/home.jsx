// React
var React = require('react');

var authActions = require("../actions/authActions");

//Components
var Signin = require("./SignInForm");
var Signup = require("./SignUpForm");
var Logo = require("./home/logo");
var authStore = require("../stores/authStore");
// Router
var Router = require("react-router");
var Link = Router.Link;
var browserHistory = Router.browserHistory;

// Component
var Home = React.createClass({
    displayName: "Home",
    propTypes: {},
    mixins: [authStore.mixin],
    getInitialState: function () {
        return null;
    },
    storeDidChange: function(){
        this.redirectAuthenticated(authActions.getUserInfo());
    },
    componentWillMount: function () {
        this.redirectAuthenticated(authActions.getUserInfo());
    },
    redirectAuthenticated: function(user){
        if(user.role){
            if(user.role === "Owner"){
                browserHistory.push('/employees');
            } else if (user.role === "Supervisor"){
                browserHistory.push('/staff');
            } else{
                browserHistory.push("/timesheets/"+user.id);
            }
        }
    },
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
