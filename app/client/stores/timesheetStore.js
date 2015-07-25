// This will store the timesheets available to the user
// For ease of programming this should start using lowDash

var Flux = require('../biff');

// initialize the store this will have an _timesheetsay of timesheets, it will probably have one timesheet to start
// then as I build out the process it should support having multiple timesheets and be able to edit individual entries in
// each one.

//A sample timesheet, which will include some meta data about the timesheet
//{
//     "timesheetId": "8d741119-9b92-4fea-b64c-3b7854e40665",
//     "dateRange":"01/01/2015 - 01/15/2015",
//     "userId": "jbarclay",
//     "clientId": "",
//     "supervisorApproved": "",
//     "entries": [{
//         "date": "02/03/2015",
//         "hours": 4,
//         "type": "Access Drive"
//     }, {
//         "date": "02/03/2015",
//         "hours": 2,
//         "type": "Access Drive"
//     }, {
//         "date": "02/03/2015",
//         "hours": 6,
//         "type": "Access Drive"
//     }]
// };
var _timesheets = [{
    "timesheetID": "8d741119-9b92-4fea-b64c-3b7854e40665",
    "dateRange": "01/01/2015 - 01/15/2015",
    "userID": "0000001",
    "approved": "",
    "engagement": "",
    "entries": [{
        "date": "2015-03-02",
        "duration": 4,
        "type": "Access Drive"
    }, {
        "date": "2015-03-02",
        "duration": 2,
        "type": "Access Drive"
    }, {
        "date": "2015-03-02",
        "duration": 6,
        "type": "Access Drive"
    }]
}];

var timesheetStore = Flux.createStore({
    getTimesheets: function() {
        return _timesheets;
    },
    getTimesheet: function(id){
        for (index = 0; index < _timesheets.length; index++) {

            if (_timesheets[index].timesheetID === id) {
                return _timesheets[index];
            }
        }
        return null;
    },
    createTimesheet: function(timesheet) {
        //append a timesheet to the timesheetStore
        _timesheets.push(timesheet);
    },
    deleteTimesheet: function(id) {
        findTimesheet(id, function(index){
            _timesheets.splice(index, 1);
        });
    },
    updateTimesheet: function(timesheet) {
        findTimesheetindex(timesheet.timeoutsheetID, function(index){
            _timesheets[index] = timesheet;
        });
    },
    addRow: function(id, entry){
        console.log(id);
        findTimesheetIndex(id, function(index){
            _timesheets[index].entries.push(entry);
        });
    },
    deleteRow: function(id, rowIndex){
        findTimesheetIndex(id, function(index){
            _timesheets[index].entries.splice(rowIndex,1);
        });
    },
    updateItem: function(id, rowIndex, accessor, data){
        console.log("id:" + id);
        console.log(rowIndex);
        findTimesheetIndex(id, function(index){
            console.log("index: " + index);
            console.log(_timesheets[index].entries[rowIndex][accessor]);
            _timesheets[index].entries[rowIndex][accessor] = data;
        });
    }
}, function(payload) {
    if (payload.actionType === "CREATE_TIMESHEET") {
        this.createTimesheet(payload.timesheet);
        this.emitChange();
    }
    if (payload.actionType === "DELETE_TIMESHEET") {
        this.deleteTimesheet(payload.timesheetID);
        this.emitChange();
    }
    if (payload.actionType === "UPDATE_TIMESHEET") {
        this.updateUser(payload.timesheet);
        this.emitChange();
    }
    if (payload.actionType === "ADD_ROW") {
        this.addRow(payload.id, payload.entry);
        this.emitChange();
    }
    if (payload.actionType === "DELETE_ROW") {
        this.deleteRow(payload.id, payload.index);
        this.emitChange();
    }
    if (payload.actionType === "UPDATE_ITEM") {
        this.updateItem(payload.data.id, payload.data.index, payload.data.accessor, payload.data.value);
        this.emitChange();
    }
});

var findTimesheetIndex = function(id, callback){
    // returns the index of the timesheet if it exists and null otherwise

    for (index = 0; index < _timesheets.length; index++) {

        if (_timesheets[index].timesheetID === id) {
            return callback(index);
        }
    }
    return callback(null);
};
module.exports = timesheetStore;
