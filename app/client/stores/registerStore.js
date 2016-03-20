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
    updateEntry(entry){
        _register[entry.accessor] = entry.value;
    }
}, function(payload){
    if(payload.actionType === "UPDATE_ENTRY"){
        this.updateEntry(payload.entry);
        this.emitChange();
    }
});

module.exports = registerStore;
