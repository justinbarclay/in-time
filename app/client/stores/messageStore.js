// This store will take in a

// Flux implementation
var Flux = require('../biff');

// initialize the store
// this is a simple object, because I only want to store one authenticated user at a time
var _message = {"owner": {current:"hello world"}};

var messageStore = Flux.createStore({
    addMessage: function(accessor, message){
        if(_message[accessor].current === null){
            _message[accessor].current = message;
        } else if(_message[accessor].stack){
            _message[accessor].stack.push(message);
        } else{
            _message[accessor].stack = [message];
        }
    },
    getMessage: function(accessor){
        temp = _message[accessor].current;
        if(_message[accessor].stack){
            _message[accessor].current = _message[accessor].stack[0];
            _message[accessor].stack = _message[accessor].stack.slice(1);
        } else {
            _message[accessor].current = null;
        }
        return temp;
    }
}, function(payload){
    if(payload.actionType == "ADD_MESSAGE"){
        this.addMessage(payload.accessor, payload.message);
        this.emitChange();
    }
});
module.exports = messageStore;
