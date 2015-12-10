var React = require("react");
// Flux
var timesheetActions = require("../actions/timesheetActions");
var timesheetStore = require("../stores/timesheetStore");
var authActions = require('../actions/authActions');
//Sub component
var TimesheetRow = require("./timesheetRow");
var TimesheetMeta = require("./timesheetMeta");

var Timesheet = React.createClass({
    displayName: "Timesheet",
    mixins: [timesheetStore.mixin],
    propTypes: [],
    getInitialState: function() {
        // console.log(timesheetActions.getTimesheet(this.props.params.id));
        return  timesheetActions.getTimesheet(this.props.params.id);
    },
    storeDidChange: function() {
        this.setState(timesheetActions.getTimesheet(this.props.params.id));
    },
    newRow: function() {
        var newRow = {
            "date": "",
            "duration": "0",
            "service": "type of service"
        };
        return timesheetActions.addRow(this.state.timesheetID, newRow);
    },
    saveTimesheet: function() {
        timesheetActions.saveTimesheet(this.state.timesheetID);
    },
    render: function() {
        // console.log(this.state);
        var self = this;
        var entryFields = [
            {
                "name": "Date",
                "accessor": "date",
                "type": "date"
            }, {
                "name": "Duration",
                "accessor": "duration",
                "type": "number"
            }, {
                "name": "Service",
                "accessor": "service",
                "type": "text"
            }
        ];
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
        var entries = this.state.entries.map(function(entry, index) {
            return <TimesheetRow deletable={false} entry={entry} fields={entryFields} id={self.state.timesheetID} index={index} key={index}/>;
        });
        var headings = entryFields.map(function(field, index) {
            return <label className="heading" key={index}>{field.name}</label>;
        });
        var metadata = <TimesheetMeta timesheet={this.state} fields={metaFields} />;

        var metaHeadings = metaFields.map(function(field, index) {
            return <label className="metaHeading" key={index}>{field.name}</label>;
            });

        return (
            <div>
                <div className="meta">
                    {metaHeadings}
                    {metadata}
                </div>
                <div className="fields">
                    <div className="row">{headings}</div>
                    {entries}
                    <div className="newRowContainer">
                        <button className="addButton" onClick={this.newRow}>
                            +
                        </button>
                        <button className="saveButton" onClick={this.saveTimesheet}>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Timesheet;
