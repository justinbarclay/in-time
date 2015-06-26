//React
var React = require("react");
var validator  = require("validator");
//Component
var SignUpForm = React.createClass({
    displayName: "Sign Up Form",
    propTypes: [],
    mixins: [],
    // onchange: function() {
    //
    // },
    render: function () {
        return (
            <form action="/signup" className="signupForm" id="signupForm" method="post" name="user">
                <div>
                    <label htmlFor="username">Username</label>
                    <input id="username" name="username" type="text"/>
                </div>
                <div>
                  <label htmlFor="email">E-mail</label>
                  <input type="text" id="email" name="email" />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input id="signUpPassword" name="password" type="password"/>
                </div>
                <div>
                    <label htmlFor="Confirm.password">Confirm Password</label>
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
