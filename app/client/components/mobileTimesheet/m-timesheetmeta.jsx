var React = require('react');
var moment = require('moment');
var TimesheetMeta = require('../timesheetMeta');
//Sub Components
var ReactDOM = require("react-dom");

var MobileTimesheetMeta = React.createClass({
    displayName: "timesheetMeta",
    propTypes: [],
    getInitialState: function() {
        return {metaFields: [
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
        ],
        edit: true};
    },
    componentDidMount: function(){
        if (this.state.edit){
            ReactDOM.findDOMNode(this.refs.metaEdit).style.display = "none";
        } else {
            ReactDOM.findDOMNode(this.refs.metaEdit).style.display = "inherit";
        }
    },
    editable: function(){
        var edit = !this.state.edit;
        if (edit){
            ReactDOM.findDOMNode(this.refs.metaEdit).style.display = "none";
        } else {
            ReactDOM.findDOMNode(this.refs.metaEdit).style.display = "inherit";
        }
        this.setState({edit:edit});

    },
    render: function() {
        return (
            <div className="metaContainer">
                <div className="m-timesheetMeta" onClick={this.editable}>
                    <div className="date">{moment(new Date(this.props.timesheet.startDate)).format("MM/DD/YYYY")} - {moment(new Date(this.props.timesheet.endDate)).format("MM/DD/YYYY")}</div>
                    <div className="text">Engagement:</div><div className="engagement">{this.props.timesheet.engagement}</div>
                </div>
                <TimesheetMeta ref="metaEdit" userID={this.props.timesheet.userID} timesheet={this.props.timesheet} hidden={this.state.edit}/>
            </div>
        );
    }
});

module.exports = MobileTimesheetMeta;
