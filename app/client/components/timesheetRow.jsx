var React = require("react");
var Navigation = require("react-router");
var timesheetActions = require('../actions/timesheetActions');
//Child Components
var TimesheetInput = require('./timesheetInput');
var DatePicker = require('react-datepicker');


var TimesheetRow = React.createClass({
    displayName: "Timesheet",
    mixins: [],
    propTypes: [],
    getInitialState: function() {
        return null;
    },
    buildRow: function(field, index) {
        return <TimesheetInput  accessor={field.accessor}
                                className="timesheetInput"
                                readOnly={this.props.readOnly}
                                id={this.props.id}
                                key={index}
                                index={this.props.index}
                                userID={this.props.userID}
                                type={field.type}
                                value={this.props.entry[field.accessor]} />;
    },
    deleteRow: function() {
        timesheetActions.deleteRow(this.props.userID, this.props.id, this.props.index);
    },
    changeDate: function(time){
        entry = {
            userID: this.props.userID,
            id: this.props.id,
            index: this.props.index,
            accessor: "date",
            value: time
        };
        timesheetActions.updateEntry(entry);
    },
    render: function() {
        var rows = this.props.fields.map(this.buildRow);
        var del = <div className="delButton" onClick={this.deleteRow}>&times;</div>;
        return (
            <div className="timesheetRow">
                <DatePicker
                dateFormat="MM/DD/YYYY"
                placeholderText="Click to select a date"
                minDate = {this.props.startDate || undefined}
                maxDate = {this.props.endDate || undefined}
                selected={this.props.entry.date || undefined}
                onChange={this.changeDate}
                disabled={this.props.readOnly}
                type="text" />

                {rows}
                {this.props.deletable ? del : null}
            </div>
        );
    }
});

module.exports = TimesheetRow;
