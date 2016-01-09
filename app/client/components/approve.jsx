var React = require("react");

//Actions
var timesheetActions = require("../actions/timesheetActions");

var NavSignedOut = React.createClass({
    displayName: "approve",
    propTypes: {},
    mixins: [],
    getInitialState: function(){
        return({
            timesheetID: this.proprs.timesheetID
        });
    },
    approve: function(){
        timesheetActions.approve(this.state.timesheetID);
    },
    render: function(){
        return (
            <div className="button approve" onClick={approve}>Approve</div>
        );
    }
});
