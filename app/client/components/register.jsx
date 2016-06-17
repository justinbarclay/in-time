//React
var React = require("react");
var ReactDOM = require("react-dom");
var MessageNew = require("./messageNew");
var HashHistory = require('react-router').HashHistory;

var registerActions = require('../actions/registerActions');
var authActions = require('../actions/authActions');
var messageActions = require('../actions/messageActions');
var messageStore = require('../stores/messageStore');
var authStore = require('../stores/authStore');

//Component
var Register = React.createClass({
    displayName: "Register",
    propTypes: [],
    mixins: [messageStore.mixin],
    getInitialState: function(){
        return {};
    },
    storeDidChange: function(){
        submit.disabled = false;
    },
    signup: function(form){
        self = this;
        form.preventDefault();
        submit.disabled = true;
        var user = {
            "email": ReactDOM.findDOMNode(this.refs.email).value.trim(),
            "password": ReactDOM.findDOMNode(this.refs.password).value.trim()
        };
        var org = {"organization": ReactDOM.findDOMNode(this.refs.orgName).value.trim()};
        if (this.validateSubmission()){
            org = registerActions.getInfo();
            organization={org:org, user:user};
            registerActions.signUpOrg(organization);
        }
    },
    validateEmail: function(email){
        //this very roughly validates an email address, it is not a thorough check
        emailRegEx = /^(([a-zA-Z]|[0-9])|([-]|[_]|[.]))+[@](([a-zA-Z0-9])|([-])){2,63}[.](([a-zA-Z0-9]){2,63})+$/;
        return emailRegEx.test(email);
    },
    validateSubmission: function() {
        var email = ReactDOM.findDOMNode(this.refs.email).value.trim();
        var password = ReactDOM.findDOMNode(this.refs.password).value.trim();
        var confirm = ReactDOM.findDOMNode(this.refs.confirmPassword).value.trim();

        //This is a messy if statement
        // console.log(typeof username);
        if (!this.validateEmail(email)){
            messageActions.addMessage("regorg", "E-mail address is not valid");
            return false;
        } else if(password.length < 5){
            messageActions.addMessage("regorg", "Password must be at least 5 characters long");
            return false;
        } else if (password !== confirm) {
            messageActions.addMessage("regorg", "Passwords do not match");
            return false;
        } else {
            return true;
        }
    },
    render: function () {
        return (
            <div className="signupForm">
                <MessageNew accessor="regorg" hidden={true} />
                <form name="user" action="" onSubmit={this.signup} method="post">
                    <div>
                      <label htmlFor="orgName">Organization name</label>
                      <input type="text" ref="orgName" name="orgName" id="orgName"/>
                    </div>
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
        );
    }

});

module.exports = Register;
