var Flux = require("../biff");
var timesheetStore = require('../stores/timesheetStore');


var timesheetActions = Flux.createActions({
    getTimesheets: function(){
        return timesheetStore.getTimesheets();
    },
    getTimesheet: function(id){
        return timesheetStore.getTimesheet(id);
    },
    deleteTimesheets: function(){
        this.dispatch({
            actionType: "DELETE_TIMESHEETS"
        });
    },
    newTimesheet: function(id){
        this.dispatch({
            actionType: "NEW_TIMESHEET",
            id: id
        });
    },
    addRow: function(id, entry){
        console.log('action');
        this.dispatch({
            actionType: "ADD_ROW",
            id: id,
            entry: entry
        });
    },
    deleteRow: function(id, index){
        this.dispatch({
            actionType: "DELETE_ROW",
            id: id,
            index: index
        });
    },
    updateEntry: function(entry){
        console.log("actions");
        this.dispatch({
            actionType: "UPDATE_ENTRY",
            data: entry
        });
    },
    updateMeta: function(meta){
        console.log("actions");
        this.dispatch({
            actionType: "UPDATE_META",
            data: meta
        });
    }
});

module.exports = timesheetActions;
