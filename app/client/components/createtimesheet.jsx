var React = require('react');
var ReactDOM = require('react-dom');
var browserHistory = require('react-router').browserHistory;

//actions
var timesheetActions= require('../actions/timesheetActions');

var uuid = require('uuid');

var CreateTimesheet = React.createClass({
    displayName: "Create Timesheets",
    componentDidMount: function(){
        if (this.props.hidden){
            ReactDOM.findDOMNode(this.refs.create).style.display = "none";
        }
    },
    newTimesheet: function(){
        var newID =uuid.v4();
        timesheetActions.newTimesheet(this.props.userID, newID);
        browserHistory.push("/timesheet/" + this.props.userID +"/"+ newID);
    },
    componentWillUpdate: function(nextProps, nextState){
        if (nextProps.hidden){
            ReactDOM.findDOMNode(this.refs.create).style.display = "none";
        } else {
            ReactDOM.findDOMNode(this.refs.create).style.display = "inline-block";
        }
    },
    render: function(){
        return (
        <div className="row">
            <div ref="create" className="button createTimesheet" onClick={this.newTimesheet}>Create New Timesheet</div>
        </div>);

    }
});

module.exports = CreateTimesheet;
