var React = require("react");
var Navigation = require("react-router");
var timesheetActions = require('../../actions/timesheetActions');
var timesheetStore = require('../../stores/timesheetStore');
var hashHistory = require('react-router').hashHistory;
//Child Components
var TimesheetInput = require('../timesheetInput');
var DatePicker = require('react-datepicker');


var TimesheetEditRow = React.createClass({
    displayName: "Timesheet Edit",
    mixins: [timesheetStore.mixin],
    propTypes: [],
    getInitialState: function() {
        return {
            index: this.props.params.row,
            id: this.props.params.id,
            timesheet:timesheetActions.getTimesheet(this.props.params.userID, this.props.params.id),
            deletable: true,
            fields: [
                {
                    "name": "Duration",
                    "accessor": "duration",
                    "type": "number"
                }, {
                    "name": "Service",
                    "accessor": "service",
                    "type": "text"
                }
            ]
        };
    },
    storeDidChange: function(){
        this.setState({
            index: this.props.params.row,
            id: this.props.params.id,
            entry: timesheetActions.findRow(this.props.params.userID, this.props.params.id, this.props.params.row)
        });
    },
    buildRow: function(field, index) {
        return(
        <label key={index}>{field.name}
            <TimesheetInput  accessor={field.accessor}
                                userID={this.props.params.userID}
                                className={"m-timesheetInput " + field.accessor}
                                id={this.state.id}
                                index={this.state.index}
                                type={field.type}
                                value={this.state.timesheet.entries[this.state.index][field.accessor]} />
        </label>
    );
    },
    deleteRow: function() {
        timesheetActions.deleteRow(this.props.params.userID, this.props.params.id, this.props.params.row);
        hashHistory.push(`/timesheet/${this.props.params.userID}/${this.props.params.id}`);
    },
    changeDate: function(time){
        entry = {
            userID: this.props.params.userID,
            id: this.state.id,
            index: this.state.index,
            accessor: "date",
            value: time
        };
        timesheetActions.updateEntry(entry);
    },
    render: function() {
        var del = <div className="delButton" onClick={this.deleteRow}>Delete</div>;
        return (
            <div className="m-timesheeteditrow">
                <label>Date
                <DatePicker
                dateFormat="MM/DD/YYYY"
                placeholderText="Click to select a date"
                minDate = {this.state.timesheet.startDate || undefined}
                maxDate = {this.state.timesheet.endDate || undefined}
                selected={this.state.timesheet.entries[this.state.index].date || undefined}
                onChange={this.changeDate}
                type="date" /></label>
                {this.state.fields.map(this.buildRow)}
                <div className="control">
                    <div className="button back" onClick={hashHistory.goBack}>Back</div>
                    {this.state.deletable ? del : null}
                </div>
            </div>
        );
    }
});

module.exports = TimesheetEditRow;
