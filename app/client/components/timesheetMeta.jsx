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
            userID: this.props.timesheet.userID,
            id: this.props.timesheet.timesheetID,
            accessor: "startDate",
            value: time
        };
        timesheetActions.updateMeta(meta);
    },
    changeEnd: function(time){
        meta = {
            userID: this.props.timesheet.userID,
            id: this.props.timesheet.timesheetID,
            accessor: "endDate",
            value: time,
            index: this.props.index
        };
        timesheetActions.updateMeta(meta);
    },
    render: function() {
        return (
            <div className="timesheetMeta">
                <label>Start Date
                <DatePicker
                    accessor="startDate"
                    dateFormat="MM/DD/YYYY"
                    placeholderText="Click to select a date"
                    selected={this.props.timesheet.startDate || undefined}
                    id={this.props.timesheet.timesheetID}
                    onChange={this.changeStart}
                    readOnly={this.props.readOnly? this.props.readOnly:false}
                    /></label>
                <label>End Date
                <DatePicker
                    accessor="endDate"
                    dateFormat="MM/DD/YYYY"
                    placeholderText="Click to select a date"
                    selected={this.props.timesheet.endDate || undefined}
                    id={this.props.timesheet.timesheetID}
                    onChange={this.changeEnd}
                    readOnly={this.props.readOnly? this.props.readOnly:false}
                    /></label>
                <label>Engagement
                <TextEntry
                    userID={this.props.userID}
                    className="metaInfo"
                    accessor="engagement"
                    id={this.props.timesheet.timesheetID}
                    type="number"
                    inputCallback={this.handleChange}
                    value={this.props.timesheet.engagement} /></label>
            </div>
        );
    }
});

module.exports = TimesheetMeta;
