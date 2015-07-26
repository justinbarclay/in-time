var React = require("react");

// Flux
var timesheetActions = require("../actions/timesheetActions");
var timesheetStore = require("../stores/timesheetStore");
//Sub component
var TimesheetRow = require("./timesheetRow");
var TimesheetMeta = require("./timesheetMeta");

var Timesheet = React.createClass({
    displayName: "Timesheet",
    mixins: [timesheetStore.mixin],
    propTypes: [],
    getInitialState: function() {
        return timesheetActions.getTimesheet("8d741119-9b92-4fea-b64c-3b7854e40665");
    },
    storeDidChange: function() {
        console.log("store change");
        this.setState(timesheetActions.getTimesheet("8d741119-9b92-4fea-b64c-3b7854e40665"));
    },
    newRow: function() {
        var newRow = {
            "date": "",
            "duration": "0",
            "service": "type of service"
        };
        return timesheetActions.addRow(this.state.timesheetID, newRow);
    },
    render: function() {
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
            return <TimesheetRow deletable={true} entry={entry} fields={entryFields} id={self.state.timesheetID} index={index} key={index}/>;
        });
        var headings = entryFields.map(function(field, index) {
            return <label className="heading" key={index}>{field.name}</label>;
        });
        var metadata = <TimesheetMeta timesheet={this.state} fields={metaFields} />;

        var metaHeadings = metaFields.map(function(field, index) {
            return <label className="metaHeading" key={index}>{field.name}</label>;
            });
        // var metadata = null;
// var headings = this.state.fields.map(function(field) {
//     return (
//         <span className="headings small-4 columns">
//             {field}
//         </span>
//     );
// });

        return (
            <div>
                <div className="meta">
                    {metaHeadings}
                    {metadata}
                </div>
                <div className="fields">
                    {headings}
                    {entries}
                    <div className="newRowContainer">
                        <button className="addButton" onClick={this.newRow}>
                            +
                        </button>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Timesheet;
