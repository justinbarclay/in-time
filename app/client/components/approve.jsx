var React = require("react");

//Actions
var timesheetActions = require("../actions/timesheetActions");

var Approve = React.createClass({
    displayName: "approve",
    propTypes: {},
    mixins: [],
    getInitialState: function(){
        return({
            timesheetID: this.props.timesheetID
        });
    },
    approve: function(){
        timesheetActions.approve(this.state.timesheetID);
    },
    render: function(){
        return (
            <div className="button approve" onClick={this.approve}>Approve</div>
        );
    }
});

module.exports = Approve;
