//React
var React = require("react");
var Navigation = require('react-router').Navigation;
var authActions = require('../actions/authActions');

//Components
var Message = require('./message');

var SignInForm = React.createClass({
    displayName: "SignInForm",
    mixins:[Navigation],
    getInitialState: function(){
        return { signInMessage: '', hidden: true };
    },
    login: function(form){
        self = this;
        form.preventDefault();
        user = JSON.stringify({
            "username": React.findDOMNode(this.refs.username).value.trim(),
            "password": React.findDOMNode(this.refs.password).value.trim()
        });
        var AJAXreq = new XMLHttpRequest();
        AJAXreq.open("post", "/signin", true);
        AJAXreq.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        AJAXreq.send(user);
        AJAXreq.onreadystatechange = function () {
            console.log("state change");
            var res = JSON.parse(AJAXreq.responseText);
            if (AJAXreq.readyState === 4)   {
                //more debugging stuff
                console.log(AJAXreq.readyState);
                console.log(res.message);
                self.setState({signInMessage: res.message, hidden: false});
                self.transitionTo('about');
                user.token = res.JWT;
                authActions.signinUser(user);
            } else {
                //Debugging stuff
                console.log(AJAXreq.readyState);
                console.log(res.message);
            }
        };
    },
    render: function(){
        return (
            <div className="signinForm">
                <Message message={this.state.signInMessage} hidden={this.state.hidden} />
                <form name="user" onSubmit={this.login} method="post">
                    <div>
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" ref="username" name="username" />
                    </div>
                    <div>
                        <label htmlFor="signInPassword">Password</label>
                        <input type="password" id="signInPassword" ref="password" name="password" />
                    </div>
                    <button type="submit"> Submit </button>
                </form>
            </div>

        );
    }

});

module.exports = SignInForm;
