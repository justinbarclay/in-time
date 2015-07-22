var React = require("react");
var TimesheetRow = require("./timesheetRow");
var Timesheet = React.createClass({
    displayName: "Timesheet",
    mixins: [],
    propTypes: [],
    getInitialState: function() {
        return ({
            "fields": [
                "date of service", "duration of service", "description of service"
            ],
            "entries": [
                {
                    "date": "02/03/2015",
                    "hours": 4,
                    "type": "Access Drive"
                }, {
                    "date": "02/03/2015",
                    "hours": 2,
                    "type": "Access Drive"
                }, {
                    "date": "02/03/2015",
                    "hours": 6,
                    "type": "Access Drive"
                }
            ]
        });
    },
    render: function() {
        var self = this;
        var entries = this.state.entries.map(function(entry) {
            return <TimesheetRow  entry={entry}/>;
        });

        var headings = this.state.fields.map(function(field) {
            return (
                <span className="headings small-4 columns">
                    {field}
                </span>
            );
        });

        return (
            <div>
                <div className="row">
                    {headings}
                </div>
                <div className="fields">
                    {entries}
                </div>
            </div>
        );
    }
});

module.exports = Timesheet;
