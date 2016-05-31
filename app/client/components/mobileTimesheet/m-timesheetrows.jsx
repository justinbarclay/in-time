var React = require("react");
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
        pageState = timesheetActions.getTimesheet(this.props.params.id);
        console.log(pageState);
        if (!pageState) {
            timesheetActions.grabTimesheet(authActions.getUserInfo().id, this.props.params.id);
            return null;
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
        this.setState({timesheet: timesheetActions.getTimesheet(this.props.params.id)});
    },
    buildRows: function(){
        var self = this;
        var entries = this.state.timesheet.entries.map(function(entry, index) {
            if (entry.delete === false) {
                return <TimesheetRow startDate={self.state.timesheet.startDate} endDate={self.state.timesheet.endDate} entry={entry} fields={self.state.entryFields} id={self.state.timesheet.timesheetID} row={index} key={index} user={self.state.userID}/>;
            }
        });
        return entries;
    },
    displayApprove: function() {
        currentUser = authActions.getUserInfo();
        console.log("Current User ID " + currentUser.id );
        console.log("State id " + this.props.id);
        if ((currentUser.role === "Supervisor" || currentUser.role === "Owner") && currentUser.id !== this.state.timesheet.userID) {
            return true;
        } else {
            return false;
        }
    },
    render: function(){
        var editButtons = this.displayApprove()? <Approve timesheetID={this.state.timesheet.timesheetID}/>
        : <TimesheetEditButtons timesheetID={this.state.timesheet.timesheetID}/>;
        return(
            <div className="newRowContainer">
                {this.buildRows()}
                {editButtons}
            </div>);
    }
});

module.exports = TimesheetRows;
