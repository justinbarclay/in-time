var React = require('react');
var Navigation = require('react-router').Navigation;
var uuid = require('uuid');
//data
var timesheetStore = require('../stores/timesheetStore');
var timesheetActions = require('../actions/timesheetActions');

//Sub components
var Timesheet = require('./timesheet');
var ToTimesheet = require('./ToTimesheet');

var Timesheets = React.createClass({
    displayName: "Timesheets",
    propTypes: [],
    mixins: [Navigation],
    getInitialState: function() {
        return {timesheets: timesheetActions.getTimesheets()};
    },
    goToTimesheet: function(){
        return null;
    },
    newTimesheet: function(){
        var newID =uuid.v4();
        timesheetActions.newTimesheet(newID);
        this.transitionTo("timesheet",{id: newID});
    },
    render: function() {
        console.log(this.state);
        var timesheets = this.state.timesheets.map(function(timesheet, index){
            return <ToTimesheet timesheet={timesheet} key={index} />;
        });
        return (
            <div>
                <div className="timesheetsContainer">
                    {timesheets}
                </div>
                <div className="row">
                    <button onClick={this.newTimesheet}>+</button>
                </div>
            </div>
        );
    }
});

module.exports = Timesheets;
