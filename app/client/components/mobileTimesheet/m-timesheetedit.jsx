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
            entry:timesheetActions.findRow(this.props.params.id, this.props.params.row),
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
            entry: timesheetActions.findRow(this.props.params.id, this.props.params.row)
        });
    },
    buildRow: function(field, index) {
        return <TimesheetInput  accessor={field.accessor}
                                className="m-timesheetInput"
                                id={this.state.id}
                                key={index}
                                index={this.state.index}
                                type={field.type}
                                value={this.state.entry[field.accessor]} />;
    },
    deleteRow: function() {
        timesheetActions.deleteRow(this.props.params.id, this.props.params.row);
    },
    changeDate: function(time){
        entry = {
            id: this.state.id,
            index: this.state.index,
            accessor: "date",
            value: time
        };
        timesheetActions.updateEntry(entry);
    },
    render: function() {
        var del = <div className="delButton" onClick={this.deleteRow}>&times;</div>;
        return (
            <div className="m-timesheeteditrow">
                <DatePicker
                dateFormat="MM/DD/YYYY"
                placeholderText="Click to select a date"
                minDate = {this.state.entry.startDate || undefined}
                maxDate = {this.state.entry.endDate || undefined}
                selected={this.state.entry.date || undefined}
                onChange={this.changeDate}
                type="string" />
                {this.state.fields.map(this.buildRow)}
                <div className="button back" onClick={hashHistory.goBack}>Back</div>
                {this.state.deletable ? del : null}
            </div>
        );
    }
});

module.exports = TimesheetEditRow;
