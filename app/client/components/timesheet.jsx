var React = require("react");
var Navigation = require('react-router').Navigation;
// Flux
var timesheetActions = require("../actions/timesheetActions");
var timesheetStore = require("../stores/timesheetStore");
var authActions = require('../actions/authActions');
//Sub component
var TimesheetRow = require("./timesheetRow");
var TimesheetMeta = require("./timesheetMeta");

// other
var uuid = require('uuid');

var Timesheet = React.createClass({
    displayName: "Timesheet",
    mixins: [Navigation, timesheetStore.mixin],
    propTypes: [],
    componentWillMount: function () {
        if (!this.state){
            this.transitionTo("/timesheets");
        }
    },
    getInitialState: function() {
        return timesheetActions.getTimesheet(this.props.params.id);
    },
    storeDidChange: function() {
        this.setState(timesheetActions.getTimesheet(this.props.params.id));
    },
    newRow: function() {
        var newRow = {
            "rowID": uuid.v4(),
            "date": "",
            "duration": 0,
            "service": "type of service",
            "delete": false
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
            console.log(entry.delete);
            if(entry.delete === false){
                return <TimesheetRow deletable={true} entry={entry} fields={entryFields} id={self.state.timesheetID} index={index} key={index}/>;
            }
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
