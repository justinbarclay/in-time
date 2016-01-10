var React = require("react");
var Navigation = require('react-router').Navigation;
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
    mixins: [Navigation, timesheetStore.mixin],
    propTypes: [],
    componentWillMount: function () {
        if (!this.state){
            this.transitionTo("/timesheets");
        }
        currentUser = authActions.getUserInfo().role;
        this.setState({owner: "Staff"});
        if (authActions.getUserInfo().role === "Supervisor") {
            if (this.state.userID === currentUser.userID){
                this.setState({owner: "Supervisor"});
            }
        }
    },
    getInitialState: function() {
        pageState = timesheetActions.getTimesheet(this.props.params.id);
        return pageState;
        },
    storeDidChange: function() {
        this.setState(timesheetActions.getTimesheet(this.props.params.id));
    },
    newRow: function() {
        var newRow = {
            "rowID": uuid.v4(),
            "date": "",
            "duration": 0,
            "service": "type of service",
            "delete": false
        };
        return timesheetActions.addRow(this.state.timesheetID, newRow);
    },
    saveTimesheet: function() {
        timesheetActions.saveTimesheet(this.state.timesheetID);
    },
    deleteTimesheet: function() {
        self = this;
        console.log("Hold for 2 seconds");
        this.setState({timer: window.setTimeout(function(){
            self.transitionTo('/timesheets');
            timesheetActions.deleteTimesheet(self.state.timesheetID);
        }, 2000)});
    },
    hoverDelete:function(event){
        this.state.deleteMessage === "Delete" ? this.setState({deleteMessage:"Hold To Delete"}) : this.setState({deleteMessage:"Delete"});
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
        var entries = this.state.entries.map(function(entry, index) {
            if(entry.delete === false){
                return <TimesheetRow deletable={true} entry={entry} fields={entryFields} id={self.state.timesheetID} index={index} key={index}/>;
            }
        });

        var headings = entryFields.map(function(field, index) {
            return <label className="heading" key={index}>{field.name}</label>;
        });

        var metadata = <TimesheetMeta timesheet={this.state} fields={metaFields} />;

        var metaHeadings = metaFields.map(function(field, index) {
            return <label className="metaHeading" key={index}>{field.name}</label>;
        });
        var editButtons = this.state.owner === "Supervisor" ? <Approve timesheetID={this.state.timesheetID}/> : <TimesheetEditButtons timesheetID={this.state.timesheetID}/>;
        return (
            <div className="timesheetPage">
                <div className="meta">
                    {metaHeadings}
                    {metadata}
                </div>
                <div className="fields">
                    <div className="headings row">{headings}</div>
                    {entries}
                    {editButtons}
                </div>
            </div>
        );
    }
});

module.exports = Timesheet;
