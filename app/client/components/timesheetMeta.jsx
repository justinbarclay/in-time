var React = require('react');
var timesheetActions = require('../actions/timesheetActions');
var DatePicker = require('react-datepicker');
//Sub Components
var TextEntry = require('./textentry');

var TimesheetMeta = React.createClass({
    displayName: "timesheetMeta",
    propTypes: [],
    getInitialState: function() {
        return null;
    },
    handleChange: function(meta) {
        // delete meta.index;   
        timesheetActions.updateMeta(meta);
    },
    changeStart: function(time){
        meta = {
            id: this.props.timesheet.timesheetID,
            accessor: "startDate",
            value: time
        };
        timesheetActions.updateMeta(meta);
    },
    changeEnd: function(time){
        meta = {
            id: this.props.timesheet.timesheetID,
            accessor: "endDate",
            value: time,
            index: this.props.index
        };
        timesheetActions.updateMeta(meta);
    },
    render: function() {
        return (
            <div>
                <DatePicker
                    accessor="startDate"
                    dateFormat="MM/DD/YYYY"
                    placeholderText="Click to select a date"
                    selected={this.props.timesheet.startDate || undefined}
                    id={this.props.timesheet.timesheetID}
                    onChange={this.changeStart}
                    type="text" />
                <DatePicker
                    accessor="endDate"
                    dateFormat="MM/DD/YYYY"
                    placeholderText="Click to select a date"
                    selected={this.props.timesheet.endDate || undefined}
                    id={this.props.timesheet.timesheetID}
                    onChange={this.changeEnd}
                    type="text" />
                <TextEntry
                    className="metaInfo"
                    accessor="engagement"
                    id={this.props.timesheet.timesheetID}
                    type="number"
                    inputCallback={this.handleChange}
                    value={this.props.timesheet.engagement} />
            </div>
        );
    }
});

module.exports = TimesheetMeta;
var metaFields = [
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
];
