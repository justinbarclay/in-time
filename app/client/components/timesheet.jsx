var React = require("react");

// Flux
var timesheetActions = require("../actions/timesheetActions");
var timesheetStore = require('../stores/timesheetStore');
//Sub component
var TimesheetRow = require("./timesheetRow");

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
            'date': '',
            'duration': 'duration of service',
            'type': 'type of service'
        };
        return timesheetActions.addRow(this.state.timesheetID, newRow);
    },
    render: function() {
        var self = this;
        var fields = [
            {
                "name": "Date",
                "accessor": "date"
            }, {
                "name": "Duration",
                "accessor": "duration"
            }, {
                "name": "Type",
                "accessor": "type"
            }
        ];

        var entries = this.state.entries.map(function(entry, index) {
            return <TimesheetRow entry={entry} fields={fields} id={self.state.timesheetID} index={index} key={index}/>;
        });
        var headings = fields.map(function(field, index) {
            return <label className="small-4 column heading" key={index}>{field.name}</label>;
        });
// var headings = this.state.fields.map(function(field) {
//     return (
//         <span className="headings small-4 columns">
//             {field}
//         </span>
//     );
// });

        return (
            <div>
                <div>
                    {metadata}
                </div>
                <div className="row">
                    {headings}
                </div>
                <div className="fields">
                    {entries}
                    <div className="newRowContainer">
                        <button className="newRow" onClick={this.newRow}>
                            +
                        </button>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Timesheet;
