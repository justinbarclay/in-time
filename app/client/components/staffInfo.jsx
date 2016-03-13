var React = require("react");
var hashHistory = require("react-router").hashHistory;
var staffActions = require("../actions/staffActions");
// Sub-component

var StaffInfo = React.createClass({
    displayName: "StaffTracker",
    propTypes: [],
    mixins: [],
    getInitialState: function(){
        return({staff: this.props.staff, hours: this.props.hours});
    },
    loadTimesheets: function(){
        staffActions.setTimesheets(staffActions.getStaff(this.state.staff).timesheets);
        hashHistory.push("/timesheets");
    },
    render: function(){
        return (
            <div className="staffInfo" onClick={this.loadTimesheets}>
                <div>{this.state.staff}</div>
                <div>{this.state.hours} </div>
            </div>
        );
    }
});

module.exports = StaffInfo;
