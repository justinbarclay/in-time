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

        console.log(meta.toDate());
        console.log(meta);
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
            value: time
        };
        timesheetActions.updateMeta(meta);
    },
    render: function() {
        return (
            <div>
                <DatePicker
                    className=" metaInfo"
                    accessor="startDate"
                    dateFormat="YYYY/MM/DD"
                    placeholderText="Click to select a date"
                    selected={this.props.timesheet.startDate || null}
                    id={this.props.timesheet.timesheetID}
                    onChange={this.changeStart}
                    type="text" />
                <DatePicker
                    className="metaInfo"
                    accessor="endDate"
                    id={this.props.timesheet.timesheetID}
                    onChange={this.changeEnd}
                    type="text"
                    value={this.props.timesheet.endDate} />
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
