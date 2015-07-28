//React
var React = require("react");
var Navigation = require('react-router').Navigation;
var Link = require('react-router').Link;
var authActions = require('../actions/authActions');
var authStore = require('../stores/authStore');

//Components
var Message = require('./message');

var SignInForm = React.createClass({
    displayName: "SignInForm",
    mixins: [Navigation, authStore.mixin],
    getInitialState: function() {
        return {
            signInMessage: '',
            hidden: true
        };
    },
    storeDidChange: function(){
        if(authActions.authenticated()){
            this.transitionTo("timesheets");
        } else {
            this.setState({
                hidden: false,
                signInMessage: authActions.getUserInfo().message
            });
        }
    },
    login: function(form) {
        // Most of this needs to be moved to authActions
        form.preventDefault();

        var user = {
            "username": React.findDOMNode(this.refs.username).value.trim(),
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
                <button onClick={this.transitions}>
                    Timesheets
                </button>
            </div>

        );
    }

});

module.exports = SignInForm;
