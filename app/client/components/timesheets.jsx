var React = require('react');
var Navigation = require('react-router').Navigation;
var uuid = require('uuid');
//Flux
var timesheetStore = require('../stores/timesheetStore');
var timesheetActions = require('../actions/timesheetActions');
var authActions = require('../actions/authActions');

//Sub components
var Timesheet = require('./timesheet');
var ToTimesheet = require('./ToTimesheet');

var Timesheets = React.createClass({
    displayName: "Timesheets",
    propTypes: [],
    mixins: [Navigation, timesheetStore.mixin],
    getInitialState: function() {
        return {user: authActions.getUserInfo(),
            timesheets: timesheetActions.getTimesheets()};
    },
    goToTimesheet: function(){
        return null;
    },
    componentWillMount: function(){
        if(!authActions.authenticated()){
            this.transitionTo("home");
        }
    },
    newTimesheet: function(){
        var newID =uuid.v4();
        timesheetActions.newTimesheet(newID, this.state.user.id);
        this.transitionTo("/timesheet/" + newID);
    },
    storeDidChange: function() {
        this.setState({timesheets:timesheetActions.getTimesheets()});
    },
    render: function() {
        var timesheets = this.state.timesheets.map(function(timesheet, index){
            console.log(Boolean(timesheet.delete));
            timesheetInfo = !timesheet.delete ? <ToTimesheet timesheet={timesheet} key={index}/> : null;
            console.log(timesheetInfo);
            return timesheetInfo;
        });
        return (
            <div className="timesheetsPage">
                <div className="row">
                    <div className="button createTimesheet" onClick={this.newTimesheet}>Create New Timesheet</div>
                </div>
                <div className="timesheetsContainer">
                    {timesheets}
                </div>
            </div>
        );
    }
});

module.exports = Timesheets;
