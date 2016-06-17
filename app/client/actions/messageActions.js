var messageStore = require('../stores/messageStore');

var Flux = require("../biff");


// Set of allowed actions
var messageActions = Flux.createActions({
    addMessage: function(accessor, message){
        if(message){
            this.dispatch({
                actionType: "ADD_MESSAGE",
                accessor: accessor,
                message: message
            });
        }
    },
    getMessage: function(accessor){
        return messageStore.getMessage(accessor);
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
