var React = require("react");
var ReactDOM = require("react-dom");
var messageActions = require('../actions/messageActions');
var messageStore = require('../stores/messageStore');

var MessageNew = React.createClass({
    displayName: "MessageNew",
    propTypes: {},
    mixins: [messageStore.mixin],
    getInitialState: function(){
        var data = messageActions.getMessage(this.props.accessor) || null;
        if(data){
            return {message: data.message, success:data.success, hidden: false};
        } else {
            return {message: null, hidden: true};
        }
    },
    storeDidChange: function(){
            var data = messageActions.getMessage(this.props.accessor) || null;
            if(data){
                this.setState({message: data.message, success:data.success, hidden: false});
            } else {
                this.setState({message: null, hidden: true});
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
        messageActions.setNext(this.props.accessor);
    },
    render: function(){
        var classes;
        if(this.state.success){
            classes = "message success";
        } else {
            classes = "message failure";
        }
        return (
            <p ref="message" className={classes} onClick={this.handleClick}>{this.state.message}</p>
        );
    }
});

module.exports = MessageNew;
