//React
var React = require("react");
var router = require('react-router').hashHistory;

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
    next: function(){
        router.push("register/admin");
    },
    storeDidChange: function(){
        this.setState({register: registerActions.getInfo()});
    },
    render: function () {
        return (
            <div>
                <div className="instruction">
                    <p> Thank you for your interest in Timescape. We're currently in alpha, and prefer that only organizations enroll at this stage. If you're an individual who is looking to track their time, we'll have a solution for you shortly. Or you could also pretend to be an organization and that would work as well</p>
                </div>
                <div className="register">
                    <label className="registerLabel">Organization Name
                    <RegisterInput name="orgname" type="text" accessor="orgname" className="organName" value={this.state.register.orgname || ""}/>
                    </label>
                    <div className="next button" onClick={this.next}>Next</div>
                    {this.props.children}
                </div>
            </div>
        );
    }
});
// <RegisterInput name="domain" type="text" accessor="domain" className= "domain" value={this.state.register.domain || ""}/>

module.exports = Register;
