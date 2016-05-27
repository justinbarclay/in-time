var React = require("react");
var demoActions = require("../actions/demoActions");

var Demo = React.createClass({
    displayName: "Demo",
    propTypes: {},
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
