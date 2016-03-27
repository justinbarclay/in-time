//React
var React = require("react");
var ReactDOM = require("react-dom");
var Message = require("./message");

var registerActions = require('../actions/registerActions');
var authActions = require('../actions/authActions');

//Component
var SignUpOrg = React.createClass({
    displayName: "Sign Up Form",
    propTypes: [],
    mixins: [],
    getInitialState: function(){
        return { signUpMessage: '', alertHidden: true, disableSubmit: true };
    },
    signup: function(form){
        self = this;
        form.preventDefault();
        user = {
            email: React.findDOMNode(this.refs.email).value.trim(),
            password: React.findDOMNode(this.refs.password).value.trim()
        };
        if (this.validateSubmission()){
            org = registerActions.getInfo();
            register={org:org, user:user};
            register = JSON.stringify(register);
            console.log(register);
            console.log("Called this once");
            var AJAXreq = new XMLHttpRequest();
            AJAXreq.open("post", "/api/register", true);
            AJAXreq.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
            AJAXreq.send(register);
            AJAXreq.onreadystatechange = function () {
                if (AJAXreq.readyState === 4)   {
                    self.setState({signUpMessage: AJAXreq.responseText, alertHidden: false});
                }
            };

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
            this.setState({signUpMessage: "E-mail address is not valid", alertHidden: false});
            return false;
        } else if(password.length < 5){
            this.setState({signUpMessage: "Password must be at least 5 characters long", alertHidden: false});
            return false;
        } else if (password !== confirm) {
            this.setState({signUpMessage: "Passwords do not match", alertHidden: false});
            return false;
        } else {
            return true;
        }
    },
    render: function () {
        return (
            <div className="signupForm">
                <Message message={this.state.signUpMessage} hidden={this.state.alertHidden} />
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
                    <button type="submit"> Submit </button>
                </form>
            </div>
        );
    }

});

module.exports = SignUpOrg;
