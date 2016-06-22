// This will store the timesheets available to the user
// For ease of programming this should start using lowDash

var Flux = require('../biff');
var uuid = require("node-uuid");
var moment = require("moment");
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
//     "delete": false
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

var _timesheets = {};

var timesheetStore = Flux.createStore({
    getTimesheets: function(userID) {
        if (_timesheets && !!_timesheets[userID]){
            return _timesheets[userID];
        } else {
            return null;
        }
    },
    getTimesheet: function(userID, id) {
        if(_timesheets[userID]){
            for (index = 0; index < _timesheets[userID].length; index++) {
                if (_timesheets[userID][index].timesheetID === id) {
                    return _timesheets[userID][index];
                }
            }
        }
        return null;
    },
    newTimesheet: function(userID, timesheetID) {
        //start a new timesheet
        newTimesheet = cloneObject(_templateTimesheet);
        newTimesheet.timesheetID = timesheetID;
        newTimesheet.userID = userID;
        _timesheets[userID] = _timesheets[userID].concat(newTimesheet);
    },
    deleteTimesheet: function(userID, id) {
        findTimesheetIndex(userID, id, function(index) {
            _timesheets[userID][index].delete = true;
        });
    },
    deleteTimesheets: function(userID) {
        _timesheets[userID] = [];
    },
    updateTimesheet: function(userID, timesheet) {
        findTimesheetIndex(userID, timesheet.timeoutsheetID, function(index) {
            _timesheets[userID][index] = timesheet;
        });
    },
    addRow: function(userID, id, entry) {
        findTimesheetIndex(userID, id, function(index) {
            _timesheets[userID][index].entries.push(entry);
        });
    },
    deleteRow: function(userID, id, rowIndex) {
        findTimesheetIndex(userID, id, function(index) {
            _timesheets[userID][index].entries[rowIndex].delete = true;
        });
    },
    updateEntry: function(userID, id, rowIndex, accessor, data) {

        findTimesheetIndex(userID, id, function(index) {
            // Clean up number only values because some browsers don't handle this
            // for you
            if(accessor === "duration" && !isNumeric(data)){

                console.log("Not a number");
            } else {
            _timesheets[userID][index].entries[rowIndex][accessor] = data;
            }
        });
    },
    updateMeta: function(userID, id, accessor, data) {
        findTimesheetIndex(userID, id, function(index) {
            _timesheets[userID][index][accessor] = data;
        });
    },
    syncTimesheets: function(userID, timesheets){
        timesheets.forEach(function(timesheet){
            timesheet.startDate = moment(timesheet.startDate, "YYYY-MM-DD", true);
            timesheet.endDate = moment(timesheet.endDate, "YYYY-MM-DD", true);
            timesheet.entries.forEach(function(entry){
                entry.date = moment(entry.date, "YYYY-MM-DD", true);
            });
        });
        _timesheets[userID] = timesheets;
    },
    addTimesheet: function(userID, timesheet){
        _timesheets[userID].push(timesheet);
    },
    findRow: function(userID, id, rowIndex){
        var row;
        findTimesheetIndex(userID, id, function(index){
            try {
                row = _timesheets[index].entries[rowIndex];
                return row;
            } catch (e){
                console.log(e);
                row = undefined;
                return undefined;
            }
        });
        return row;
    },
    clearAll: function(){
        _timesheets = {};
    }
}, function(payload) {
    if (payload.actionType === "NEW_TIMESHEET") {
        this.newTimesheet(payload.userID, payload.timesheetID);
        this.emitChange();
    }
    if (payload.actionType === "DELETE_TIMESHEET") {
        this.deleteTimesheet(payload.userID, payload.timesheetID);
        this.emitChange();
    }
    if (payload.actionType === "UPDATE_TIMESHEET") {
        this.updateUser(payload.userID, payload.timesheet);
        this.emitChange();
    }
    if (payload.actionType === "ADD_ROW") {
        this.addRow(payload.userID, payload.id, payload.entry);
        this.emitChange();
    }
    if (payload.actionType === "DELETE_ROW") {
        this.deleteRow(payload.userID, payload.id, payload.index);
        this.emitChange();
    }
    if (payload.actionType === "UPDATE_ENTRY") {
        this.updateEntry(payload.data.userID, payload.data.id, payload.data.index, payload.data
            .accessor, payload.data.value);
        this.emitChange();
    }
    if (payload.actionType === "UPDATE_META") {
        this.updateMeta(payload.data.userID, payload.data.id, payload.data.accessor, payload
            .data.value);
        this.emitChange();
    }
    if (payload.actionType === "DELETE_TIMESHEETS") {
        this.deleteTimesheets();
        this.emitChange();
    }
    if (payload.actionType === "ADD_TIMESHEET"){
        this.addTimesheet(payload.userID, payload.data);
        this.emitChange();
    }
    if (payload.actionType === "SYNC_TIMESHEET") {
        this.syncTimesheets(payload.userID, payload.timesheets);
        this.emitChange();
    }
    if (payload.actionType === "CLEAR_ALL") {
        this.clearAll();
        this.emitChange();
    }
});

var findTimesheetIndex = function(userID, id, callback) {
    // returns the index of the timesheet if it exists and null otherwise
    console.log("Timesheets: " + _timesheets[userID]);
    for (index = 0; index < _timesheets[userID].length; index++) {

        if (_timesheets[userID][index].timesheetID === id) {
            return callback(index);
        }
    }
    return callback(null);
};

var _templateTimesheet = {
    "timesheetID": null,
    "startDate": "",
    "endDate": "",
    "approved": false,
    "engagement": "",
    "delete": false,
    "entries": [{
        "rowID": uuid.v4(),
        "date": "",
        "duration": 0,
        "type": "type of service",
        "delete": false
    }]
};

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

var cloneObject = function(obj) {
    //a trick to deep clone an object
    return (JSON.parse(JSON.stringify(obj)));
};
module.exports = timesheetStore;
