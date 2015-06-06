//React
var React = require("react");

//Component
var SignUpForm = React.createClass({
    displayName: "Sign Up Form",
    propTypes: [],
    mixins: [],

    render: function () {
        return (
            <form action="/signup" id="signupForm" method="post" name="user" onChange="return checkPasswords()">
                <div>
                    <label for="username">Username</label>
                    <input id="username" name="username" type="text"/>
                </div>
                <div>
                    <label for="password">Password</label>
                    <input id="signUpPassword" name="password" type="password"/>
                </div>
                <div>
                    <label for="Confirm.password">Confrim Password</label>
                    <input id="Confirm.password" name="Confirm.password" type="password"/>
                </div>
                <div id="signupSubmit">
                    <input type="submit" value="Submit"/>
                </div>
            </form>
        );
    }

});

module.exports = SignUpForm;
