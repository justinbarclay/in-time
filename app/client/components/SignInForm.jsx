//React
var React = require("react");
var ReactRouter = require("react-router");
var Link = ReactRouter.link;
var hashHistory = ReactRouter.hashHistory;
var authActions = require('../actions/authActions');
var authStore = require('../stores/authStore');

//Components
var Message = require('./message');

var SignInForm = React.createClass({
    displayName: "SignInForm",
    mixins: [authStore.mixin],
    getInitialState: function() {
        return {
            signInMessage: '',
            hidden: true
        };
    },
    storeDidChange: function(){
        if(authActions.isLoggedIn()){
            console.log("Auth Actions");
            console.log(authActions.isLoggedIn());
            hashHistory.push("/timesheets");
        } else {
            submit.disabled = false;
            this.setState({
                hidden: false,
                signInMessage: authActions.getUserInfo().message
            });
        }
    },
    login: function(form) {
        form.preventDefault();
        submit.disabled = true;
        var user = {
            "email": React.findDOMNode(this.refs.email).value.trim(),
            "password": React.findDOMNode(this.refs.password).value.trim()
        };
        authActions.signIn(user);
    },
    render: function() {
        return (
            <div className="signinForm">
                <Message hidden={this.state.hidden} message={this.state.signInMessage}/>
                <form method="post" name="user" onSubmit={this.login}>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input id="email" name="email" ref="email" type="text"/>
                    </div>
                    <div>
                        <label htmlFor="signInPassword">Password</label>
                        <input id="signInPassword" name="password" ref="password" type="password"/>
                    </div>
                    <button id="submit" type="submit">
                        Submit
                    </button>
                </form>
            </div>

        );
    }

});

module.exports = SignInForm;
