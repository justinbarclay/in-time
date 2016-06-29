var React = require('react');
var timesheetActions = require('../../actions/timesheetActions');
var authActions = require('../../actions/authActions');
var timesheetStore = require('../../stores/timesheetStore');
var browserHistory = require('react-router').browserHistory;
//Child Components
var TimesheetEditButtons = require('./m-timesheeteditbuttons');
var MobTimesheetMeta = require('./m-timesheetmeta');
var MessageNew = require('../messageNew');
var TimesheetRows = require('./m-timesheetrows');

var Timesheet = React.createClass({
    displayName: "Mobile Timesheet",
    mixins: [timesheetStore.mixin],
    getInitialState: function() {
        return(timesheetActions.getTimesheet(this.props.params.userID, this.props.params.id));
    },
    componentWillMount: function() {

        if (!this.state){
            setTimeout(function(){
                browserHistory.push("/timesheets");
            }, 300);
        }
    },
    storeDidChange: function(){
        this.setState(timesheetActions.getTimesheet(this.props.params.userID, this.props.params.id));
    },
    disabled: function(){
        var currentUser = authActions.getUserInfo();
        var approved = this.state.approved || false;
        if ((currentUser.role !== "Staff" && currentUser.id != this.props.params.userID) || approved) {
            return true;
        } else {
            return false;
        }
    },
    render: function() {
        data = <div className="button">We were unable to find your timesheet,
        <br /> you will be redirected to timesheets shortly</div>;
        return (
            <div className="timesheetPage">
                <MessageNew accessor="timesheet" hidden={true}/>
                <MobTimesheetMeta timesheet={this.state} disabled={this.disabled()}/>
                {this.props.children}
            </div>
        );
    }

});

module.exports = Timesheet;
