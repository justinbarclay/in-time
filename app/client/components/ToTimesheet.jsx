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
        id = this.props.timesheet.timesheetID ? this.props.timesheet.timesheetID
            : null;
        this.transitionTo("/timesheet/" + id);
    },
    totalDuration: function() {
        // console.log("total Duration");
        entries = this.props.timesheet.entries;
        var duration = 0;
        // console.log("entries", entries);
        entries.forEach(function(entry) {
            duration += parseInt(entry.duration);
        });
        return duration;
    },
    render: function() {
        return (
            <div className="timesheet" onClick={this.goToTimesheet}>
                <div className="engagement">{this.props.timesheet.engagement}</div>
                <div>{(new Date(this.props.timesheet.startDate).toDateString()).slice(0, -4)}
                    to {(new Date(this.props.timesheet.endDate).toDateString()).slice(0, -4)}</div>
                <div className="info"><div>Total Time:
                    {this.totalDuration()}</div><div>Entries</div></div>
            </div>
        );
    }
});

module.exports = ToTimesheet;
