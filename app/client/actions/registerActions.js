var registerStore = require('../stores/registerStore');

var Flux = require("../biff");

// Set of allowed actions
var registerActions = Flux.createActions({
    getInfo: function(){
        return registerStore.getInfo();
    },
    updateEntry: function(entry){
        console.log("Entry: ", entry);
        this.dispatch({
            actionType: "UPDATE_ORG",
            entry: entry
        });
    }
});

module.exports = registerActions;
