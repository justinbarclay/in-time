var uuid = require("node-uuid");
var React = require('react');
var hashHistory = require("react-router").hashHistory;

var timesheetActions = require("../../actions/timesheetActions");
var hashHistory = require('react-router').hashHistory;

var TimesheetEditButtons = React.createClass({
    displayName: "row edit",
    propTypes: {},
    mixins: [],
    getInitialState: function(){
        return({
            deleteMessage: "Delete",
            timesheetID: this.props.timesheetID
        });
    },
    newRow: function() {
        var newRow = {
            "rowID": uuid.v4(),
            "date": "",
            "duration": 0,
            "service": "type of service",
            "delete": false
        };
        return timesheetActions.addRow(this.props.userID, this.state.timesheetID, newRow);
    },
    saveTimesheet: function() {
        return timesheetActions.saveTimesheet(this.props.userID, this.state.timesheetID);
    },
    deleteTimesheet: function() {
        self = this;
        this.setState({timer: window.setTimeout(function(){
            hashHistory.push('/timesheets');
            timesheetActions.deleteTimesheet(self.props.userID, self.state.timesheetID);
        }, 2000)});
    },
    clearTimeout: function(){
        window.clearTimeout(this.state.timer);
    },
    render: function (){
        return (
            <div className="newRowContainer">
                <div className="add button" onClick={this.newRow}>
                    +
                </div>
                <div className="save button" onClick={this.saveTimesheet}>
                    Save
                </div>
                <div className="delete button" onTouchStart={this.deleteTimesheet} onTouchEnd={this.clearTimeout} onMouseEnter={this.hoverDelete} onMouseLeave={this.hoverDelete}>
                    {this.state.deleteMessage}
                </div>
            </div>
        );
    }
});

module.exports = TimesheetEditButtons;
