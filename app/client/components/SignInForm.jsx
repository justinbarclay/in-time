//React
var React = require("react");
//var Navigation = require('react-router').Navigation;
var Message = require('./message');

var SignInForm = React.createClass({
    displayName: "SignInForm",
    getInitialState: function(){
        return { signInMessage: '', hidden: false };
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
            if (AJAXreq.readyState === 4)   {
                console.log(4);
                console.log(AJAXreq.responseText);
                self.setState({signInMessage: AJAXreq.responseText, hidden: true});
            } else {
                alert(AJAXreq.readyState + "\n" +
                    "What the fuck?");
                console.log(AJAXreq.responseTEXT);
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
                    <input type="submit" value="Submit" />
                </form>
            </div>

        );
    }

});

module.exports = SignInForm;
