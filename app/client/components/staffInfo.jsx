var React = require("react");
var Navigation = require('react-router').Navigation;
var staffActions = require("../actions/staffActions");
// Sub-component

var StaffInfo = React.createClass({
    displayName: "StaffTracker",
    propTypes: [],
    mixins: [Navigation],
    getInitialState: function(){
        return({staff: this.props.staff, hours: this.props.hours});
    },
    loadTimesheets: function(){
        staffActions.setTimesheets(staffActions.getStaff(this.state.staff).timesheets);
        this.transitionTo("/timesheets");
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
