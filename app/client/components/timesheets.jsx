var React = require('react');
var browserHistory = require('react-router').browserHistory;
var uuid = require('uuid');
//Flux
var timesheetStore = require('../stores/timesheetStore');
var timesheetActions = require('../actions/timesheetActions');
var authActions = require('../actions/authActions');

//Sub components
var Timesheet = require('./timesheet');
var TimesheetInfo = require('./timesheetinfo');

var Timesheets = React.createClass({
    displayName: "Timesheets",
    propTypes: [],
    mixins: [timesheetStore.mixin],
    getInitialState: function() {
        return {user: authActions.getUserInfo(),
            timesheets: timesheetActions.getTimesheets()};
    },
    componentWillMount: function(){
        if(!authActions.authenticated()){
            browserHistory.push("home");
        }
    },
    newTimesheet: function(){
        var newID =uuid.v4();
        timesheetActions.newTimesheet(newID, this.state.user.id);
        browserHistory.push("/timesheet/" + newID);
    },
    storeDidChange: function() {
        this.setState({timesheets:timesheetActions.getTimesheets()});
    },
    render: function() {
        var timesheets = this.state.timesheets.map(function(timesheet, index){
            timesheetInfo = !timesheet.delete ? <TimesheetInfo timesheet={timesheet} key={index}/> : null;
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
