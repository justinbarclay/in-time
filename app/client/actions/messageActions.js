var messageStore = require('../stores/messageStore');

var Flux = require("../biff");


// Set of allowed actions
var messageActions = Flux.createActions({
    addMessage: function(accessor, message, success){
        if(message){
            this.dispatch({
                actionType: "ADD_MESSAGE",
                accessor: accessor,
                message: message,
                success: success
            });
        }
    },
    getMessage: function(accessor){
        return messageStore.getMessage(accessor);
    },
    setNext: function(accessor){
        this.dispatch({
            actionType: "SET_NEXT",
            accessor: accessor
        });
    },
    clearMessage: function(accessor){
        return this.dispatch({
            actionType: "CLEAR_MESSAGES",
            accessor: accessor
        });
    },
    clearAll: function(){
        return this.dispatch({
            actionType: "CLEAR_ALL"
        });
    }
});

module.exports = messageActions;
