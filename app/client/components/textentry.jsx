var React = require("react");

var TextEntry = React.createClass({
    displayName: "Text Entry",
    getInitialState: function(){
        return {value:null};
    },
    handleInputChange: function(event){
        var newValue = event.target.value;
        this.props.inputCallback({
            userID: this.props.userID,
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
        // Value needs to be initialized to a non null input or React gets mad
        var baseValue = this.props.type === "number" ? 0 : " ";
        var value = this.state.value || this.props.value || baseValue;
        return (
            <input
            className={this.props.className}
            type={this.props.type}
            value={value}
            onChange={this.handleInputChange}
            disabled={this.props.readOnly || false} />
        );
    }
});

module.exports = TextEntry;
