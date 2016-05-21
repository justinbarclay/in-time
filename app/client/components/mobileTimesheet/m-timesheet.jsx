var React = require('react');
var TimesheetRow = require('./m-timesheetrow');
var TimesheetMeta = require('./m-timesheetmeta');
var TimesheetEditButtons = require('./m-timesheeteditbuttons');
var MessageNew = require('../messageNew');


var timesheetActions = require('../../actions/timesheetActions');
var authActions = require('../../actions/authActions');
var timesheetStore = require('../../stores/timesheetStore');

var Timesheet = React.createClass({
    displayName: "Mobile Timesheet",
    mixins: [timesheetStore.mixin],
    componentWillMount: function() {
        if (!this.state){
            setTimeout(function(){
                router.push("/timesheets");
            }, 300);
        }
    },
    displayApprove: function() {
        currentUser = authActions.getUserInfo();
        if (currentUser.role === "Supervisor" && currentUser.id !== this.state.userID) {
            return true;
        } else {
            return false;
        }
    },
    getInitialState: function() {
        pageState = timesheetActions.getTimesheet(this.props.params.id);
        console.log("PAGE STATE" + pageState);
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
                ],
                metaFields: [
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
                ]
            });
        }
    },
    storeDidChange: function() {
        this.setState({timesheet: timesheetActions.getTimesheet(this.props.params.id)});
    },render: function() {
        console.log("entryFields " + this.state.entryFields);
        var self = this;
        if (this.state.timesheet) {
            var entries = this.state.timesheet.entries.map(function(entry, index) {
                if (entry.delete === false) {
                    return <TimesheetRow deletable={true} startDate={self.state.timesheet.startDate} endDate={self.state.timesheet.endDate} entry={entry} fields={self.state.entryFields} id={self.state.timesheetID} index={index} key={index}/>;
                }
            });
            var metadata = <TimesheetMeta timesheet={this.state.timesheet} />;
            var editButtons = this.displayApprove()? <Approve timesheetID={this.state.timesheet.timesheetID}/>
        : <TimesheetEditButtons timesheetID={this.state.timesheet.timesheetID}/>;

            data = <div>
                        <MessageNew accessor="timesheet" hidden={true}/>
                        <div className="meta">{metadata}</div>
                        <div className="fields">
                            {entries}
                            {editButtons}
                        </div>
                    </div>;
        } else {
            data = <div className="button">We were unable to find your timesheet,
            <br /> you will be redirected to timesheets shortly</div>;
        }
        return (
            <div className="timesheetPage">{data}</div>
        );
    }

});

module.exports = Timesheet;
