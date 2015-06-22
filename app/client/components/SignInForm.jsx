//React
var React = require("react");


var SignInForm = React.createClass({
    displayName: "SignInForm",
    propTypes: [],
    mixins: [],

    render: function(){
        return (
            <form id="signInForm" className="signinForm" name="user" action="/signin" method="post">
              <div>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input type="password" id="signInPassword" name="password" />
              </div>
              <input type="submit" value="Submit" />
            </form>
        );
    }

});

module.exports = SignInForm;
