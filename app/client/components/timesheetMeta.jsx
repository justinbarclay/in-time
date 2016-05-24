var React = require('react');
var timesheetActions = require('../actions/timesheetActions');

//Sub Components
var TextEntry = require('./textentry');
var DatePicker = require('react-datepicker');

var TimesheetMeta = React.createClass({
    displayName: "timesheetMeta",
    propTypes: [],
    handleChange: function(meta) {
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
                    type="date" />
                <DatePicker
                    accessor="endDate"
                    dateFormat="MM/DD/YYYY"
                    placeholderText="Click to select a date"
                    selected={this.props.timesheet.endDate || undefined}
                    id={this.props.timesheet.timesheetID}
                    onChange={this.changeEnd}
                    type="date" />
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
