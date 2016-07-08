var React = require('react');
//Child Components
var TimesheetInput = require('../timesheetInput');
var DatePicker = require('react-datepicker');
var TimesheetRow = require('./m-timesheetrow');

var timesheetStore = require('../../stores/timesheetStore');
var timesheetActions = require('../../actions/timesheetActions');
var authActions = require('../../actions/authActions');
var TimesheetEditButtons = require('./m-timesheeteditbuttons');
var Approve = require('../approve');
var TimesheetRows = React.createClass({
    displayName: "Timesheet Rows",
    mixins: [timesheetStore.mixin],
    getInitialState: function() {
        pageState = timesheetActions.getTimesheet(this.props.params.userID, this.props.params.id);
        if (!pageState) {
            timesheetActions.grabTimesheet(this.props.params.userID, this.props.params.id);
            return {};
        } else {
            return ({timesheet: pageState,
                entryFields: [
                    {
                        "name": "Date",
                        "accessor": "date",
                        "type": "string"
                    },
                    {
                        "name": "Duration",
                        "accessor": "duration",
                        "type": "number"
                    }, {
                        "name": "Service",
                        "accessor": "service",
                        "type": "text"
                    }
                ]
            });
        }
    },
    storeDidChange: function() {
        this.setState({timesheet: timesheetActions.getTimesheet(this.props.params.userID, this.props.params.id)});
    },
    buildRows: function(timesheet){
        var self = this;
        if(!timesheet){
            return null;
        }
        var entries = timesheet.entries.map(function(entry, index) {
            if (entry.delete === false) {
                return <TimesheetRow userID={self.props.params.userID} readOnly={self.displayApprove()} startDate={self.state.timesheet.startDate} endDate={self.state.timesheet.endDate} entry={entry} fields={self.state.entryFields} id={self.state.timesheet.timesheetID} row={index} key={index}/>;
            }
        });
        return entries;
    },
    displayApprove: function() {
        currentUser = authActions.getUserInfo();
        try{
            if ((currentUser.role === "Supervisor" || currentUser.role === "Owner") && currentUser.id !== this.state.timesheet.userID) {
                return true;
            } else {
                return false;
            }
        } catch(e){
            return false;
        }
    },
    render: function(){
        var editButtons = null;
        if(this.state.timesheet){
        editButtons = this.displayApprove()? <Approve userID={this.props.params.userID} timesheetID={this.state.timesheet.timesheetID}/>
    : <TimesheetEditButtons timesheetID={this.state.timesheet.timesheetID} userID={this.props.params.userID}/>;
    }
        return(
            <div className="newRowContainer">
                {this.buildRows(this.state.timesheet)}
                {editButtons}
            </div>);
    }
});

module.exports = TimesheetRows;
