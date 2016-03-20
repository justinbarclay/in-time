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
        console.log(entry);
        _register[entry.accessor] = entry.value;
    }
}, function(payload){
    if(payload.actionType === "UPDATE_ORG"){
        console.log(payload.entry);
        this.updateEntry(payload.entry);
        this.emitChange();
    }
    if (payload.actionType === "OTHER") {
        this.emitChange();
    }
});

module.exports = registerStore;
