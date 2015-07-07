var React = require("react");

var Message = React.createClass({
    displayName: "Message",
    propTypes: {},
    mixins: [],
    componentDidMount: function(){
        if (!this.props.hidden){
            React.findDOMNode(this.refs.message).style.display = "none";
        } else {
            React.findDOMNode(this.refs.message).style.display = "inherit";
        }
    },
    componentWillUpdate: function(newProps, newState){
        if (!newProps.hidden){
            React.findDOMNode(this.refs.message).style.display = "none";
        } else {
            React.findDOMNode(this.refs.message).style.display = "inherit";
        }
    },
    handleClick: function(){
        React.findDOMNode(this.refs.message).style.display = "none";
    },
    render: function(){
        return (
            <p ref="message" className="message" onClick={this.handleClick}>{this.props.message}</p>
        );
    }
});

module.exports = Message;
