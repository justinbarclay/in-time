var React = require('react');
var browserHistory = require('react-router').browserHistory;
var uuid = require("node-uuid");
//Flux
var timesheetStore = require('../stores/timesheetStore');
var timesheetActions = require('../actions/timesheetActions');
var authActions = require('../actions/authActions');

//Sub components
var TimesheetInfo = require('./timesheetinfo');
var CreateTimesheet = require('./createtimesheet');
var Timesheets = React.createClass({
    displayName: "Timesheets",
    propTypes: [],
    mixins: [timesheetStore.mixin],
    getInitialState: function() {
        return {
            hidden: this.hideButton(this.props.params.userID, authActions.getUserInfo().id),
            ownerID: parseInt(this.props.params.userID, 10),
            timesheets: timesheetActions.getTimesheets(this.props.params.userID)};
    },
    storeDidChange: function() {
        this.setState({timesheets:timesheetActions.getTimesheets(this.props.params.userID)});
    },
    hideButton: function(timesheetOwner, currentUser){
        if(timesheetOwner != currentUser){
            return true;
        } else {
            return false;
        }
    },
    mapTimesheets: function(){
        var self = this;
        if(!this.state.timesheets) return;
        var timesheets = this.state.timesheets.map(function(timesheet, index){
            timesheetMeta = !timesheet.delete ? <TimesheetInfo userID={self.props.params.userID} timesheet={timesheet} key={index} readOnly={false}/> : null;
            return timesheetMeta;
        });
        return timesheets;
    },
    componentWillReceiveProps: function(nextProps){
        var hidden=this.hideButton(nextProps.params.userID, authActions.getUserInfo().id);
        this.setState({
            hidden: hidden,
            user: nextProps.params.userID,
            timesheets: timesheetActions.getTimesheets(nextProps.params.userID)});
    },
    componentDidMount: function(){
        timesheetActions.syncTimesheets(this.props.params.userID);
    },
    render: function() {
        return (
            <div className="timesheetsPage">
                <CreateTimesheet userID={this.state.ownerID} hidden={this.state.hidden}/>
                <div className="timesheetsContainer">
                    {this.mapTimesheets()}
                </div>
            </div>
        );
    }
});

module.exports = Timesheets;
