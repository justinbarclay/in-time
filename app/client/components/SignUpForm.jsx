//React
var React = require("react");
var ReactDOM = require("react-dom");
var route = require("react-router").hashHistory;
var messageStore = require('../stores/messageStore');
var messageActions = require('../actions/messageActions');
var registerActions = require('../actions/registerActions');
var authActions = require('../actions/authActions');


var uuid = require("node-uuid");

//Component
var MessageNew = require('./messageNew');
var SignUpForm = React.createClass({
    displayName: "Sign Up Form",
    propTypes: [],
    mixins: [messageStore.mixin],
    getInitialState: function(){
        return {};
    },
    componentWillMount: function(){
        //Regex to verify a UUID code
        verify = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        if(!verify.test(this.props.params.code)){
            route.push("/");
        }
    },
    storeDidChange: function(){
        submit.disabled = false;
    },
    signup: function(form){
        form.preventDefault();
        submit.disabled =true;
        user = JSON.stringify({
            "email": ReactDOM.findDOMNode(this.refs.email).value.trim(),
            "password": ReactDOM.findDOMNode(this.refs.password).value.trim(),
            "code": this.props.params.code
        });

        if (this.validateSubmission()){
            registerActions.signUpUser(user);
        }
    },
    validateEmail: function(email){
        //this very roughly validates an email address, it is not a thorough check
        emailRegEx = /^(([a-zA-Z]|[0-9])|([-]|[_]|[.]))+[@](([a-zA-Z0-9])|([-])){2,63}[.](([a-zA-Z0-9]){2,63})+$/;
        // console.log("Running validate email");
        return emailRegEx.test(email);
    },
    validateSubmission: function() {
        var email = ReactDOM.findDOMNode(this.refs.email).value.trim();
        var password = ReactDOM.findDOMNode(this.refs.password).value.trim();
        var confirm = ReactDOM.findDOMNode(this.refs.confirmPassword).value.trim();

        //This is a messy if statement
        // console.log(typeof username);
        if (!this.validateEmail(email)){
            messageActions.addMessage("signup", "E-mail address is not valid.");
            return false;
        } else if(password.length < 5){
            messageActions.addMessage("signup", "Password must be at least 5 characters long.");
            return false;
        } else if (password !== confirm) {
            messageActions.addMessage("signup", "Passwords do not match.");
            return false;
        } else {
            return true;
        }
    },
    render: function () {
        return (
            <div>
                <div className="instruction">
                    <p>I'm sure you've seen plenty of these before. But if you're new to these, please enter the password you'd like to have to enter, day in day out for the rest of your working life. Oh, also the password you password must be over 5 characters in length and they both must match each other. Have fun! </p>
                </div>
                <div className="signupForm">
                    <MessageNew accessor="signup" hidden={true}/>
                    <form name="user" action="" onSubmit={this.signup} method="post">
                        <div>
                          <label htmlFor="email">E-mail</label>
                          <input type="text" ref="email" name="email" id="email"/>
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input type="password" ref="password" name="password" id="password" />
                        </div>
                        <div>
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input type="password" ref="confirmPassword" name="confirmPassword" id="confirmPassword" onBlur={this.matchPasswords}/>
                        </div>
                        <button id="submit" type="submit"> Submit </button>
                    </form>
                </div>
            </div>
        );
    }

});

module.exports = SignUpForm;
