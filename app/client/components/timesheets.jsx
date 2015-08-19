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
        this.setState(timesheetActions.getTimesheets());
    },
    render: function() {
        console.log(this.state);
        var timesheets = this.state.timesheets.map(function(timesheet, index){
            return <ToTimesheet timesheet={timesheet} key={index}/>;
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
