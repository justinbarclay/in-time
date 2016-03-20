//React
var React = require("react");
var Message = require("./message");

registerStore = require("../stores/registerStore");
registerActions = require("../actions/registerActions");
//Component
var RegisterInput = require("./registerInput");
var Register = React.createClass({
    displayName: "Register",
    propTypes: [],
    mixins: [registerStore.mixin],
    getInitialState: function(){
        register = registerActions.getInfo();
        return {register: register};
    },
    render: function () {
        return (
            <div className="register">
                <label className="registerLabel">Organization Name</label>
                <RegisterInput name="orgname" type="text" accessor="orgname" className="organization" value={this.state.register.orgname}/>

                <label className="domain">Email Domain</label>
                <RegisterInput name="domain" type="text" accessor="domain" className= "Domain" value={this.state.register.domain}/>

                <label className="phone">Phone Number</label>
                <RegisterInput name="phone" type="text" accessor="phone" className="phone" value={this.state.register.phone}/>
            </div>
        );
    }
});

module.exports = Register;
