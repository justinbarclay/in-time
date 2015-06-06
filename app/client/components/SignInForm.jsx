//React
var React = require("react");


var SignInForm = React.createClass({
    displayName: "SignInForm",
    propTypes: [],
    mixins: [],

    render: function(){
        return (
            <form id="signInForm" class="SignIn" name="user" action="/signin" method="post">
              <div>
                <label for="username">Username</label>
                <input type="text" id="username" name="username" />
              </div>
              <div>
                <label for="password">Password</label>
                <input type="password" id="signInPassword" name="password" />
              </div>
              <input type="submit" value="Submit" />
            </form>
        );
    }

});

module.exports = SignInForm;
