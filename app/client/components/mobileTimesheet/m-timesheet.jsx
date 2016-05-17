var React = require('react');
var TimesheetRow = require('.m-timesheetrow');

var Timesheet = React.creatClass({
    displayName: "Mobile Timesheet",
    mixins: [],
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
                metaHeadings: [
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
        this.setState(timesheetActions.getTimesheet(this.props.params.id));
    },render: function() {
        var self = this;
        if (this.state.timesheet) {
            var entries = this.state.entries.map(function(entry, index) {
                if (entry.delete === false) {
                    return <TimesheetRow deletable={true} startDate={self.state.startDate} endDate={self.state.endDate} entry={entry} fields={entryFields} id={self.state.timesheetID} index={index} key={index}/>;
                }
            });
            var headings = entryFields.map(function(field, index) {
                return <label className="heading" key={index}>{field.name}</label>;
            });
            entryFields.slice(0,1);
            var metadata = <TimesheetMeta timesheet={this.state} />;

            var metaHeadings = metaFields.map(function(field, index) {
                return <label className="metaHeading" key={index}>{field.name}</label>;
            });
            var editButtons = this.displayApprove()? <Approve timesheetID={this.state.timesheetID}/>
                : <TimesheetEditButtons timesheetID={this.state.timesheetID}/>;

            data = <div>
                        <MessageNew accessor="timesheet" hidden={true}/>
                        <div className="meta">{metaHeadings}{metadata}</div>
                        <div className="fields">
                            <div className="headings row">{headings}</div>
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
