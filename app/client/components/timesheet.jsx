var React = require("react");

// Flux Actions
var timesheetActions = require("../actions/timesheetActions");
//Sub component
var TimesheetRow = require("./timesheetRow");

var Timesheet = React.createClass({
    displayName: "Timesheet",
    mixins: [],
    propTypes: [],
    getInitialState: function() {
        return timesheetActions.getTimesheets();
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
            return <TimesheetRow  key={index} entry={entry} index={index} fields={fields}/>;
        });
        var headings = fields.map(function(field, index){
            return <label key={index} className="small-4 column heading">{field.name}</label>;
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
                <div className="row">
                    {headings}
                </div>
                <div className="fields">
                    {entries}
                    <div className="newRowContainer">
                        <button onClick={this.newRow} className="newRow"> + </button>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Timesheet;
