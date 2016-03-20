var registerStore = require('../stores/registerStore');


var Flux = require("../biff");


// Set of allowed actions
var registerActions = Flux.createActions({
    getInfo: function(){
        return staffStore.getInfo();
    },
    updateEntry: function(entry){
        this.dispatch({
            actionType: "upateEntry",
            entry: entry
        });
    }
});

module.exports = staffActions;
