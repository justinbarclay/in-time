//React
var React = require("react");
var Message = require("./message");
//Component
var SignUpForm = React.createClass({
    displayName: "Sign Up Form",
    propTypes: [],
    mixins: [],
    getInitialState: function(){
        return { signUpMessage: '', alertHidden: true, disableSubmit: true };
    },
    signup: function(form){
        self = this;
        form.preventDefault();
        user = JSON.stringify({
            "username": React.findDOMNode(this.refs.username).value.trim(),
            "email": React.findDOMNode(this.refs.email).value.trim(),
            "password": React.findDOMNode(this.refs.password).value.trim()
        });
        if (this.validateSubmission()){

            var AJAXreq = new XMLHttpRequest();
            AJAXreq.open("post", "/signup", true);
            AJAXreq.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
            AJAXreq.send(user);
            AJAXreq.onreadystatechange = function () {
                console.log("state change");
                if (AJAXreq.readyState === 4)   {
                    //more debugging stuff
                    console.log(AJAXreq.readyState);
                    console.log(AJAXreq.responseText);
                    self.setState({signUpMessage: AJAXreq.responseText, alertHidden: false});
                } else {
                    //Debugging stuff
                    console.log(AJAXreq.readyState);
                    console.log(AJAXreq.responseTEXT);
                }
            };

        }
    },
    validateEmail: function(email){
        //this very roughly validates an email address, it is not a thorough check
        emailRegEx = /^(([a-zA-Z]|[0-9])|([-]|[_]|[.]))+[@](([a-zA-Z0-9])|([-])){2,63}[.](([a-zA-Z0-9]){2,63})+$/;
        console.log("Running validate email");
        return emailRegEx.test(email);
    },
    validateSubmission: function() {
        var username = React.findDOMNode(this.refs.username).value.trim();
        var email = React.findDOMNode(this.refs.email).value.trim();
        var password = React.findDOMNode(this.refs.password).value.trim();
        var confirm = React.findDOMNode(this.refs.confirmPassword).value.trim();

        //This is a messy if statement
        console.log(typeof username);
        if (typeof username !== "string") {
            console.log(typeof username);
            this.setState({signUpMessage: "Username must be a string", alertHidden: false});
            return false;
        } else if (!this.validateEmail(email)){
            this.setState({signUpMessage: "E-mail address is not valid", alertHidden: false});
            return false;
        } else if(password.length < 5){
            this.setState({signUpMessage: "Password must be greater than 4 characters", alertHidden: false});
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
                        <label htmlFor="username">Username</label>
                        <input type="text" ref="username" name="username" id="username" />
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
                    <button type="submit"> Submit </button>
                </form>
            </div>
        );
    }

});

module.exports = SignUpForm;
