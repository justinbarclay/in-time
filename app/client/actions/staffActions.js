var staffStore = require('../stores/staffStore');
var timesheetStore = require('../stores/timesheetStore');

var Flux = require("../biff");


// Set of allowed actions
var staffActions = Flux.createActions({
    getAllStaff: function(){
        return staffStore.getAllStaff();
    },
    getStaff: function(id){
        return staffStore.getStaff(id);
    },
    setStaff: function(staff){
        this.dispatch({
            actionType:"SET_STAFF",
            data: data
        });
    },
    setTimesheets: function(timesheets){
        console.log(timesheets);
        timesheetStore.syncTimesheets(timesheets);
    }
});

module.exports = staffActions;
