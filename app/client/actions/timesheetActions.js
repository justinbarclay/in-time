var Flux = require("../biff");
var timesheetStore = require('../stores/timesheetStore');


var timesheetActions = Flux.createActions({
    getTimesheets: function(){
        return timesheetStore.getTimesheets();
    }
});

module.exports = timesheetActions;
