var React = require("react");
var adminActions = require("../actions/adminActions");
var ReactDOM =require('react-dom');
var MessageNew = require('./messageNew');
var Dropdown = require('react-dropdown').default;

var Owner = React.createClass({
    displayName: "owner",
    propTypes: [],
    mixins: [],
    getInitialState: function(){
        return {hidden: true, selected: "Staff"};
    },
    storeDidChange: function(){
    },
    _onSelect (option) {
        console.log('You selected ', option.label);
        this.setState({selected: option});
    },
    invite: function(form){
        form.preventDefault();
        user = {
            email: ReactDOM.findDOMNode(this.refs.email).value.trim(),
            role: this.state.selected
        };
        adminActions.invite(user);
    },
    render: function(){
        options = ["Staff", "Supervisor", "Owner"];
        var defaultOption = options[0];
        return (
            <div className="inviteUserForm">
                <MessageNew accessor="owner"/>
                <p> Please enter the email of the user you would like to invite</p>
                <form method="post" name="user" onSubmit={this.invite}>
                    <div>
                        <label htmlFor="email">Email Address</label>
                        <input id="email" name="email" ref="email" type="email"/>
                    </div>
                    <div>
                        <label htmlFor="role">Role</label>
                        <Dropdown ref="dropdown" options={options} onChange={this._onSelect} value={this.state.selected} />
                    </div>
                    <button type="submit">
                        Submit
                    </button>
                </form>
            </div>
        );
    }

});

module.exports = Owner;
