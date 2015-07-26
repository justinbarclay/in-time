var React = require('react');

//data
var timesheetStore = requite('../stores/timesheetStore');
var timesheetStore = requite('../actions/timesheetActions');

//Sub components
var Timesheet = require('./timesheet');

var Timesheets = React.createClass({
    displayName: "Timesheets",
    propTypes: [],
    mixins: [timesheetStore.mixin],
    getInitialState: function() {
        return timesheetActions.getTimesheets();
    },
    render: function() {
        console.log(this.state);
        return (
            <div>
            null
            </div>
        );
    }
});
