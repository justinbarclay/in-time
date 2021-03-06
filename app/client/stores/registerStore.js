var Flux = require('../biff');
// initialize the store
// this is a simpe object, because I only want to store one authenticated user at a time
_register={
        "organization":null,
        "domain":null,
        "phone": null
};

var registerStore = Flux.createStore({
    getInfo: function(){
        return _register;
    },
    updateEntry: function(entry){
        _register[entry.accessor] = entry.value;
    }
}, function(payload){
    if(payload.actionType === "UPDATE_ORG"){
        this.updateEntry(payload.entry);
        this.emitChange();
    }
});

module.exports = registerStore;
