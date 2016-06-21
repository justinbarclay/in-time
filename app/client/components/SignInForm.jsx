//React
var React = require("react");
var ReactDOM = require("react-dom");
var ReactRouter = require("react-router");
var Link = ReactRouter.link;
var hashHistory = ReactRouter.hashHistory;
var authActions = require('../actions/authActions');
var authStore = require('../stores/authStore');


//Components
var MessageNew = require('./messageNew');

var SignInForm = React.createClass({
    displayName: "SignInForm",
    mixins: [authStore.mixin],
    getInitialState: function() {
        return ({});
    },
    storeDidChange: function(){
        submit.disabled = false;
    },
    login: function(form) {
        form.preventDefault();
        submit.disabled = true;
        var user = {
            "email": ReactDOM.findDOMNode(this.refs.email).value.trim(),
            "password": ReactDOM.findDOMNode(this.refs.password).value.trim()
        };
        authActions.signIn(user);
    },
    render: function() {
        return (
            <div className="signinForm">
                <MessageNew accessor="signin" hidden={true}/>
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
