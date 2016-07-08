var React = require('react');
var timesheetActions = require('../actions/timesheetActions');
//Child Components
var TextEntry = require("./textentry");

var TimesheetInput = React.createClass({
    displayName: "timesheetInput",
    mixins: [],
    propTypes: [],
    getInitialState: function() {
        return {
            value: ""
        };
    },
    handleChange: function(entry) {
        timesheetActions.updateEntry(entry);
    },
    render: function() {
        return (
            <TextEntry
                ref="input"
                id={this.props.id}
                index={this.props.index}
                inputCallback={this.handleChange}
                accessor={this.props.accessor}
                readOnly={this.props.readOnly}
                type={this.props.type}
                userID={this.props.userID}
                className={this.props.className}
                value={this.props.value} />
        );
    }
});

module.exports = TimesheetInput;
