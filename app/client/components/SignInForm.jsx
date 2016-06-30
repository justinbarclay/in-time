//React
var React = require("react");
var ReactDOM = require("react-dom");
var ReactRouter = require("react-router");
var Link = ReactRouter.link;
var browserHistory = ReactRouter.browserHistory;
var authActions = require('../actions/authActions');
var authStore = require('../stores/authStore');


//Components
var MessageNew = require('./messageNew');

var SignInForm = React.createClass({
    displayName: "SignInForm",
    mixins: [authStore.mixin],
    getInitialState: function() {
        var nextPath;
        try{
            if(this.props.location.state.nextPathname){
                nextPath = this.props.location.state.nextPathname;
                console.log(nextPath);
            }
        } catch(e){
            nextPath = null;
        }
        return ({nextPath: nextPath});
    },
    storeDidChange: function(){
        submit.disabled = false;

        var user = authActions.getUserInfo();
        var path = this.state.nextPath;
        if(user.role){
            if (this.state.nextPath){
                browserHistory.push(path);
            } else if(role === "Owner"){
                browserHistory.push('/employees');
            } else if (role === "Supervisor"){
                browserHistory.push('/staff');
            } else{
                console.log("Path: ", path);
                browserHistory.push("/timesheets/"+user.id);
            }
        }

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
        console.log(this);
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
