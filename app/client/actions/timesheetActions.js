var Flux = require("../biff");
var timesheetStore = require('../stores/timesheetStore');


var timesheetActions = Flux.createActions({
    getTimesheets: function(){
        return timesheetStore.getTimesheets();
    },
    getTimesheet: function(id){
        console.log(JSON.stringify(timesheetStore.getTimesheet(id)));
        return timesheetStore.getTimesheet(id);
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
    updateItem: function(entry){
        console.log("actions");
        this.dispatch({
            actionType: "UPDATE_ITEM",
            data: entry
        });
    }
});

module.exports = timesheetActions;
