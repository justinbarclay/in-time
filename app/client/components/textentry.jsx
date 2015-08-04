var React = require("react");

var TextEntry = React.createClass({
    displayName: "TextEntry",
    getInitialState: function(){
        return {value: null};
    },
    handleInputChange: function(){
        var newValue = this.refs.inputValue.getDOMNode().value;
        console.log("Accessor: " + this.props.accessor);
        // Proxy to parent moving to generalize input
        this.props.inputCallback({
            id: this.props.id,
            accessor: this.props.accessor,
            index: this.props.index,
            value: newValue
        });
        this.setState({
            value: newValue
        });
    },
    render: function (){
        value = this.state.value || this.props.value;
        return (
            <input
            className={this.props.className}
            type={this.props.type}
            ref="inputValue"
            value={value}
            onChange={this.handleInputChange} />
        );
    }
});

module.exports = TextEntry;
