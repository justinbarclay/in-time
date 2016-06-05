var React = require('react');
var ReactDOM = require('react-dom');
var hashHistory = require('react-router').hashHistory;
var uuid = require("node-uuid");
//Flux
var timesheetStore = require('../stores/timesheetStore');
var timesheetActions = require('../actions/timesheetActions');
var authActions = require('../actions/authActions');

//Sub components
var TimesheetInfo = require('./timesheetinfo');

var Timesheets = React.createClass({
    displayName: "Timesheets",
    propTypes: [],
    mixins: [timesheetStore.mixin],
    getInitialState: function() {
        return {user: this.props.params.userID,
            timesheets: timesheetActions.getTimesheets(this.props.params.userID)};
    },
    newTimesheet: function(){
        var newID =uuid.v4();
        console.log(this.state.user.id);
        timesheetActions.newTimesheet(this.state.user.id, newID);
        hashHistory.push("/timesheet/" + this.state.user.id +"/"+ newID);
    },
    storeDidChange: function() {
        this.setAsSupervisor(this.props.params.userID);
        console.log(timesheetActions.getTimesheets(this.props.params.userID));
        this.setState({timesheets:timesheetActions.getTimesheets(this.props.params.userID)});
    },
    setAsSupervisor: function(user){
        console.log("called");
        if(user != authActions.getUserInfo().id){
            ReactDOM.findDOMNode(this.refs.create).style.display = "none";
        } else {
            ReactDOM.findDOMNode(this.refs.create).style.display = "block";
        }
    },
    createTimesheets: function(){
        var self = this;
        if(!this.state.timesheets){ return;}
        var timesheets = this.state.timesheets.map(function(timesheet, index){
            timesheetMeta = !timesheet.delete ? <TimesheetInfo userID={self.props.params.userID} timesheet={timesheet} key={index}/> : null;
            return timesheetMeta;
        });
        return timesheets;
    },
    componentWillReceiveProps: function(nextProps){
        this.setAsSupervisor(this.props.params.userID);
        this.setState({
            user: nextProps.params.userID,
            timesheets: timesheetActions.getTimesheets(nextProps.params.userID)});
    },
    componentDidMount: function(){
        this.setAsSupervisor(this.props.params.userID);
        timesheetActions.syncTimesheets(this.props.params.userID);
    },
    render: function() {
        return (
            <div className="timesheetsPage">
                <div className="row">
                    <div ref="create" className="button createTimesheet" onClick={this.newTimesheet}>Create New Timesheet</div>
                </div>
                <div className="timesheetsContainer">
                    {this.createTimesheets()}
                </div>
            </div>
        );
    }
});

module.exports = Timesheets;
