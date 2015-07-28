var React = require('react');
var Navigation = require('react-router').Navigation;

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
        entries = getTimesheet(this.props.timesheet.timesheetID).entries;
        var duration;
        for(var entry in entries) {
            duration += entry.duration;
        }
    },
    render: function() {
        return (
            <div className="timesheet" onClick={this.goToTimesheet}>
                <p>Time Period:
                    {this.props.timesheetstartDate}-{this.props.timesheet.endDate}</p>
                <p>Total Duration:
                    {this.totalDuration}</p>
            </div>
        );
    }
});

module.exports = ToTimesheet;
