var React = require("react");
var adminActions = require("../actions/adminActions");
var ReactDOM =require('react-dom');

var admin = React.createClass({
    displayName: "admin",
    propTypes: [],
    mixins: [],
    getInitialState: function(){
        return {hidden: true};
    },
    storeDidChange: function(){
    },
    invite: function(form){
        form.preventDefault();

        adminActions.invite(ReactDOM.findDOMNode(this.refs.email).value.trim());
    },
    render: function(){
        return (
            <div className="inviteUserForm">
                <p> Please enter the email of the user you would like to invite</p>
                <form method="post" name="user" onSubmit={this.invite}>
                    <div>
                        <label htmlFor="email">Email Address</label>
                        <input id="email" name="email" ref="email" type="email"/>
                    </div>
                    <button type="submit">
                        Submit
                    </button>
                </form>
            </div>
        );
    }

});

module.exports = admin;
