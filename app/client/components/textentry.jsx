var React = require("react");

var TextEntry = React.createClass({
    displayName: "TextEntry",
    handleInputChange: function(event){
        // Proxy to parent moving to generalize input
        this.props.inputCallback({
            _id: this.props._id,
            accessor: this.props.accessor,
            index: this.props.index,
            value: this.refs.inputValue.getDOMNode().value
        });
    },
    render: function (){
        return (
        <input
        className={this.props.className}
        _id={this.props._id}
        type="text"
        ref="inputValue"
        value={this.props.value}
        defaultValue={this.props.defaultValue}
        placeholder={this.props.placeholder}
        onChange={this.handleInputChange} />
        );
    }
});

module.exports = TextEntry;
