var React = require('react');
var moment = require('moment');

var TimesheetRow = React.createClass({
    displayName: "Mobile TimesheetRow",
    mixins: [],
    render: function(){
        return (<div className="m-timesheetRow">
            <div className="timesheetItem service">{this.props.entry.service}</div>
            <div className="timesheetItem date">{moment(this.props.entry.date).format("MM/DD/YYYY")}</div>
            <div className="timesheetItem duration">{moment(this.props.entry.duration).format("HH:mm")}</div>
            <div >{this.props.entry.distance || null}</div>
        </div>);
    }
});

module.exports = TimesheetRow;
