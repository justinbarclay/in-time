//React
var React = require("react");
var Navigation = require('react-router').Navigation;
var authActions = require('../actions/authActions');

//Components
var Message = require('./message');

var SignInForm = React.createClass({
    displayName: "SignInForm",
    mixins: [Navigation],
    getInitialState: function() {
        return {
            signInMessage: '',
            hidden: true
        };
    },
    login: function(form) {
        // Most of this needs to be moved to authActions
        self = this;
        form.preventDefault();
        var user = {
            "username": React.findDOMNode(this.refs.username).value.trim(),
            "password": React.findDOMNode(this.refs.password).value.trim()
        };
        var AJAXreq = new XMLHttpRequest();
        AJAXreq.open("post", "/signin", true);
        AJAXreq.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        AJAXreq.send(JSON.stringify(user));
        AJAXreq.onreadystatechange = function() {
            console.log("state change");
            //turn server response into JSON
            var res = JSON.parse(AJAXreq.responseText);
            console.log(res);
            if (AJAXreq.readyState === 4) {
                //more debugging stuff
                console.log(AJAXreq.readyState);
                console.log(res.message);
                if(res.success === true) {
                    self.transitionTo('about');
                    user.token = res.JWT;
                    authActions.signIn(user);
                } else {
                    self.setState({
                        signInMessage: res.message,
                        hidden: false
                    });
                }
            } else {
                //Debugging stuff
                console.log(AJAXreq.readyState);
                console.log(res.message);
            }
        };
    },
    render: function() {
        return (
            <div className="signinForm">
                <Message hidden={this.state.hidden} message={this.state.signInMessage}/>
                <form method="post" name="user" onSubmit={this.login}>
                    <div>
                        <label htmlFor="username">Username</label>
                        <input id="username" name="username" ref="username" type="text"/>
                    </div>
                    <div>
                        <label htmlFor="signInPassword">Password</label>
                        <input id="signInPassword" name="password" ref="password" type="password"/>
                    </div>
                    <button type="submit">
                        Submit
                    </button>
                </form>
            </div>

        );
    }

});

module.exports = SignInForm;
