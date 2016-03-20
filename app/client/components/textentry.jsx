var React = require("react");

var TextEntry = React.createClass({
    displayName: "TextEntry",
    getInitialState: function(){
        return {value: null};
    },
    handleInputChange: function(event){
        var newValue = event.target.value;
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
            value={value}
            onChange={this.handleInputChange} />
        );
    }
});

module.exports = TextEntry;
