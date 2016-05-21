var React = require('react');
var moment = require('moment');
//Sub Components

var TimesheetMeta = React.createClass({
    displayName: "timesheetMeta",
    propTypes: [],
    getInitialState: function() {
        return {metaFields: [
            {
                "name": "Start Date",
                "accessor": "startDate",
                "type": "date"
            }, {
                "name": "End Date",
                "accessor": "endDate",
                "type": "date"
            }, {
                "name": "Engagement Number",
                "accessor": "engagement",
                "type": "number"
            }
        ]};
    },
    render: function() {
        return (
            <div className="m-timesheetMeta">
                <div className="date">{moment(new Date(this.props.timesheet.startDate)).format("MM/DD/YYYY")} - {moment(new Date(this.props.timesheet.endDate)).format("MM/DD/YYYY")}</div>
                <div className="text">Engagement:</div><div className="engagement">{this.props.timesheet.engagement}</div>
            </div>
        );
    }
});

module.exports = TimesheetMeta;
