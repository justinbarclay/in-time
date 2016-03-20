var React = require("react");
var router = require('react-router').hashHistory;

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
var uuid = require('uuid');

var Timesheet = React.createClass({
    displayName: "Timesheet",
    mixins: [timesheetStore.mixin],
    propTypes: [],
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
        if (!pageState) {
            timesheetActions.grabTimesheet(authActions.getUserInfo().id, this.props.params.id);
            return null;
        } else {
            return pageState;
        }
    },
    storeDidChange: function() {
        this.setState(timesheetActions.getTimesheet(this.props.params.id));
    },
    render: function() {
        var self = this;
        var entryFields = [
            {
                "name": "Date",
                "accessor": "date",
                "type": "date"
            }, {
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
                    return <TimesheetRow deletable={true} entry={entry} fields={entryFields} id={self.state.timesheetID} index={index} key={index}/>;
                }
            });

            var headings = entryFields.map(function(field, index) {
                return <label className="heading" key={index}>{field.name}</label>;
            });

            var metadata = <TimesheetMeta timesheet={this.state} fields={metaFields}/>;

            var metaHeadings = metaFields.map(function(field, index) {
                return <label className="metaHeading" key={index}>{field.name}</label>;
            });
            var editButtons = this.displayApprove()? <Approve timesheetID={this.state.timesheetID}/>
                : <TimesheetEditButtons timesheetID={this.state.timesheetID}/>;

            data = <div><div className="meta">{metaHeadings}{metadata}</div><div className="fields"><div className="headings row">{headings}</div>{entries}{editButtons}</div></div>;
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
