var React = require('react');
var demoActions = require("../actions/demoActions");
var authActions = require("../actions/authActions");
var authStore = require("../stores/authStore");
var browserHistory = require('react-router').browserHistory;
var goodUser;
var badUser;
var Demo = React.createClass({
    displayName: "Demo",
    propTypes: {},
    mixins: [authStore.mixin],
    storeDidChange: function(){
        var user = authActions.getUserInfo();
        if(user.role){
            if(user.role === "Owner"){
                browserHistory.push('/employees');
            } else if (user.role === "Supervisor"){
                browserHistory.push('/staff');
            } else{
                browserHistory.push('/timesheets/'+authActions.getUserInfo().id);
            }
        }
    },
    setUpDemo: function(role){
        return function(){
            demoActions.loadDemo(role);
        };
    },
    render: function() {
        return (
            <div className="demoContainer">
                <p>What role would you like to try out?</p>
                <div className="demo button" onClick={this.setUpDemo("Owner")}>
                    Owner
                </div>
                <div className="demo button" onClick={this.setUpDemo("Supervisor")}>
                    Supervisor
                </div>
                <div className="demo button" onClick={this.setUpDemo("Staff")}>
                    Staff
                </div>
            </div>
        );
    }
});

module.exports = Demo;
