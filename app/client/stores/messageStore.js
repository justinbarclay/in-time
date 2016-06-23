// This store will take in a

// Flux implementation
var Flux = require('../biff');

// initialize the store
// this is a simple object, because I only want to store one authenticated user at a time
var _message = {};

var messageStore = Flux.createStore({
    addMessage: function(accessor, message){
        if(!_message[accessor] || !_message[accessor].hasOwnProperty("current")){
            _message[accessor] = {"current": message};
        } else if(_message[accessor].stack){
            _message[accessor].stack.push(message);
        } else{
            _message[accessor].stack = [message];
        }
    },
    getMessage: function(accessor){
        try{
            return _message[accessor].current;
        } catch (err) {
            return null;
        }
    },
    setNext:function(accessor){
        if(_message[accessor].stack){
            _message[accessor].current = _message[accessor].stack[0];
            _message[accessor].stack = _message[accessor].stack.slice(1);
        } else {
            _message[accessor].current = null;
        }
    },
    clearMessages: function(accessor){
        _message[accessor] = {};
    },
    clearAll: function(){
        _message = {};
    }
}, function(payload){
    if(payload.actionType == "ADD_MESSAGE"){
        this.addMessage(payload.accessor, payload.message);
        this.emitChange();
    }
    if(payload.actionType == "CLEAR_MESSAGES"){
        this.clearMessages(payload.accessor);
        this.emitChange();
    }
    if(payload.actionType == "CLEAR_ALL"){
        this.clearAll();
        this.emitChange();
    }
    if(payload.actionType == "SET_NEXT"){
        this.setNext(payload.accessor);
        this.emitChange();
    }
});
module.exports = messageStore;
