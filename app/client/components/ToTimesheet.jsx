var React = require('react');
var Navigation = require('react-router').Navigation;
var timesheetStore = require("../stores/timesheetStore");

var ToTimesheet = React.createClass({
    displayName: "ToTimesheet",
    propTypes: [],
    mixins: [Navigation],
    getInitialState: function() {
        return null;
    },
    goToTimesheet: function() {
        id = this.props.timesheet.timesheetID ? this.props.timesheet.timesheetID: null;
        this.transitionTo("/timesheet/" + id);
    },
    totalDuration: function() {
        console.log("total Duration");
        entries = this.props.timesheet.entries;
        var duration = 0;
        console.log("entries", entries);
        entries.forEach(function(entry){
            duration += entry.duration;
        });
        return duration;
    },
    render: function() {
        return (
            <div className="timesheet" onClick={this.goToTimesheet}>
                <p>{this.props.timesheet.startDate} - {this.props.timesheet.endDate}</p>
                <p>{this.props.timesheet.engagement}</p>
                <p>Total Time:  {this.totalDuration()}</p>
            </div>
        );
    }
});

module.exports = ToTimesheet;
