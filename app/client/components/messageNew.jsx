var React = require("react");
var ReactDOM = require("react-dom");
var messageActions = require('../actions/messageActions');
var messageStore = require('../stores/messageStore');

var MessageNew = React.createClass({
    displayName: "MessageNew",
    propTypes: {},
    mixins: [messageStore.mixin],
    getInitialState: function(){
        return {content:messageActions.getMessage(this.props.accessor).content, hidden: this.props.hidden, success: messageActions.getMessage(this.props.accessor).success};
    },
    storeDidChange: function(){
        var newMessage = messageActions.getMessage(this.props.accessor);
        if(newMessage){
            this.setState({message: newMessage, hidden: false});
        }
    },
    componentWillMount: function(){
        if(this.state.message){
            this.setState({hidden: false});
        }
    },
    componentDidMount: function(){
        if (this.state.hidden){
            ReactDOM.findDOMNode(this.refs.message).style.display = "none";
        } else {
            ReactDOM.findDOMNode(this.refs.message).style.display = "inherit";
        }
    },
    componentWillUpdate: function(newProps, newState){
        if (newState.hidden){
            ReactDOM.findDOMNode(this.refs.message).style.display = "none";
        } else {
            ReactDOM.findDOMNode(this.refs.message).style.display = "inherit";
        }
    },
    handleClick: function(){
        var message = messageActions.getMessage(this.props.accessor);
        if(!message){
            this.setState({hidden: true});
        } else{
            this.setState({message: message});
        }
    },
    render: function(){
        return (
            <p ref="message" className="message {this.state.success}" onClick={this.handleClick}>{this.state.message}</p>
        );
    }
});

module.exports = MessageNew;
