var React = require('react');
var hashHistory = require('react-router').hashHistory;
var timesheetStore = require("../stores/timesheetStore");

var TimesheetInfo = React.createClass({
    displayName: "TimesheetInfo",
    propTypes: [],
    mixins: [],
    getInitialState: function() {
        var className = this.props.timesheet.approved === true ? "timesheet approved" : "timesheet";
        return ({className: className});
    },
    goToTimesheet: function() {
        var id = this.props.timesheet.timesheetID ? this.props.timesheet.timesheetID
            : null;
        hashHistory.push("/timesheet/" +this.props.userID +"/"+ id);
    },
    totalDuration: function() {
        entries = this.props.timesheet.entries;
        var duration = 0;
        entries.forEach(function(entry) {
            duration += parseInt(entry.duration);
        });
        return duration;
    },
    setClassName: function(){
        var className = "timesheet";
        if (this.state.approved === true){
            className += " approved";
        }
        return className;
    },
    entriesCount: function(){
        return this.props.timesheet.entries.length;
    },
    render: function(){
        return (
            <div className={this.state.className} onClick={this.goToTimesheet} >
                <div className="engagement">{this.props.timesheet.engagement}</div>
                <div className="date">{(new Date(this.props.timesheet.startDate).toDateString()).slice(0, -4)}
                    to {(new Date(this.props.timesheet.endDate).toDateString()).slice(0, -4)}</div>
                <div className="info"><div>Total Time:
                    {this.totalDuration()}</div><div>Entries: {this.entriesCount()}</div></div>
            </div>
        );
    }
});

module.exports = TimesheetInfo;
