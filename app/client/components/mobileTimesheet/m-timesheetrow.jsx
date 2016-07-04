var React = require('react');
var moment = require('moment');
var browserHistory = require('react-router').browserHistory;

var TimesheetRow = React.createClass({
    displayName: "Mobile TimesheetRow",
    mixins: [],
    loadRow: function(){
        browserHistory.push("/timesheet/"+this.props.userID+"/"+this.props.id+"/"+this.props.row);
    },
    render: function(){
        return (<div className="m-timesheetRow" onClick={this.loadRow}>
            <div className="timesheetItem service">{this.props.entry.service}</div>
            <div className="timesheetItem date">{moment(this.props.entry.date).format("MM/DD/YYYY")}</div>
            <div className="timesheetItem duration">{this.props.entry.duration+'h'}</div>
            <div >{this.props.entry.distance || null}</div>
        </div>);
    }
});

module.exports = TimesheetRow;
