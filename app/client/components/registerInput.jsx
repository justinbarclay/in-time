var React = require('react');
var registerActions = require('../actions/registerActions');
//Child Components
var TextEntry = require("./textentry");

var registerInput = React.createClass({
    displayName: "registerInput",
    mixins: [],
    propTypes: [],
    getInitialState: function() {
        return {
            value: null
        };
    },
    handleChange: function(entry) {
        registerActions.updateEntry(entry);
    },
    render: function() {
        return (
            <TextEntry
                inputCallback={this.handleChange}
                accessor={this.props.accessor}
                type={this.props.type}
                className={this.props.className}
                value={this.props.value} />
        );
    }
});

module.exports = registerInput;
