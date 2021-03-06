var React = require('react');
var browserHistory = require('react-router').browserHistory;

// Flux
var timesheetActions = require("../actions/timesheetActions");
var timesheetStore = require("../stores/timesheetStore");
var authActions = require('../actions/authActions');

//Sub component
var TimesheetRow = require("./timesheetRow");
var TimesheetMeta = require("./timesheetMeta");
var TimesheetEditButtons = require("./timesheeteditbuttons");
var Approve = require("./approve");

// other
var uuid = require("node-uuid");
var MessageNew = require("./messageNew");

var Timesheet = React.createClass({
    displayName: "Timesheet",
    mixins: [timesheetStore.mixin],
    propTypes: [],
    getInitialState: function() {
        pageState = timesheetActions.getTimesheet(this.props.params.userID, this.props.params.id);
        if (!pageState) {
            timesheetActions.grabTimesheet(this.props.params.userID, this.props.params.id);
            return null;
        } else {
            return pageState;
        }
    },
    storeDidChange: function() {
        var newTimesheet = timesheetActions.getTimesheet(this.props.params.userID, this.props.params.id);
        if(newTimesheet){
            this.setState(newTimesheet);
        }
    },
    componentWillMount: function() {
        var self = this;
        if (!this.state){
            setTimeout(function(){
                if(!self.state){
                    browserHistory.push("/timesheets"+"/"+self.props.params.userID);
                } else {
                    console.log("cancelled");
                }
            }, 3000);
        }
    },
    disabled: function(){
        var approved = this.state.approved || false;
        if(this.displayApprove() || approved){
            return true;
        } else {
            return false;
        }
    },
    displayApprove: function() {
        currentUser = authActions.getUserInfo();
        if ((currentUser.role === "Supervisor" || currentUser.role === "Owner") && currentUser.id !== this.state.userID) {
            return true;
        } else {
            return false;
        }
    },
    render: function() {
        var self = this;
        var entryFields = [
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
        ];

        var metaFields = [
            {
                "name": "Start Date",
                "accessor": "startDate",
                "type": "date"
            }, {
                "name": "End Date",
                "accessor": "endDate",
                "type": "date"
            }, {
                "name": "Engagement Number",
                "accessor": "engagement",
                "type": "number"
            }
        ];
        if (this.state) {
            var entries = this.state.entries.map(function(entry, index) {
                if (entry.delete === false) {
                    return <TimesheetRow userID={self.props.params.userID} readOnly={self.disabled()} startDate={self.state.startDate} endDate={self.state.endDate} entry={entry} fields={entryFields.slice(1)} id={self.state.timesheetID} index={index} key={index}/>;
                }
            });
            var headings = entryFields.map(function(field, index) {
                return <label className="heading" key={index}>{field.name}</label>;
            });
            entryFields.slice(0,1);
            var metadata = <TimesheetMeta timesheet={this.state} readOnly={self.displayApprove()} disabled={self.disabled()}/>;

            var metaHeadings = metaFields.map(function(field, index) {
                return <label className="metaHeading" key={index}>{field.name}</label>;
            });
            var editButtons;
            if(!this.disabled()){
                editButtons = this.displayApprove()? <Approve userID={this.props.params.userID} timesheetID={this.state.timesheetID}/> : <TimesheetEditButtons userID={this.props.params.userID} timesheetID={this.state.timesheetID}/>;
            } else {
                editButtons = null;
            }

            data = <div>
                        <MessageNew accessor="timesheet" hidden={true}/>
                        <div className="meta">{metadata}</div>
                        <div className="fields">
                            <div className="headings row">{headings}</div>
                            {entries}
                            {editButtons}
                        </div>
                    </div>;
        } else {
            data = <div className="button">Your timesheet seems to have been misplaced. We're looking for it right now but if we don't find it,
            <br /> you will be redirected shortly</div>;
        }
        return (
            <div className="timesheetPage">{data}</div>
        );
    }
});

module.exports = Timesheet;
