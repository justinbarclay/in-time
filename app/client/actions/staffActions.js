var staffStore = require('../stores/staffStore');

var Flux = require("../biff");


// Set of allowed actions
var staffActions = Flux.createActions({
    getStaff: function(){
        return staffStore.getStaff();
    }
});

module.exports = staffActions;
