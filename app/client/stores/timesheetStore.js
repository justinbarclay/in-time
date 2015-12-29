// This will store the timesheets available to the user
// For ease of programming this should start using lowDash

var Flux = require('../biff');
var uuid = require('uuid');
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

var _timesheets = [];

var timesheetStore = Flux.createStore({
    getTimesheets: function() {
        return _timesheets;
    },
    getTimesheet: function(id) {
        for (index = 0; index < _timesheets.length; index++) {
            if (_timesheets[index].timesheetID === id && _timesheets[index].delete !== true) {
                return _timesheets[index];
            }
        }
        return null;
    },
    newTimesheet: function(timesheetID, userID) {
        //start a new timesheet
        newTimesheet = cloneObject(_templateTimesheet);
        newTimesheet.timesheetID = timesheetID;
        newTimesheet.userID = userID;
        _timesheets = _timesheets.concat(newTimesheet);
    },
    deleteTimesheet: function(id) {
        findTimesheetIndex(id, function(index) {
            _timesheets[index].delete = true;
            console.log(_timesheets[index]);
        });
    },
    deleteTimesheets: function() {
        _timesheets = [];
    },
    updateTimesheet: function(timesheet) {
        findTimesheetIndex(timesheet.timeoutsheetID, function(index) {
            _timesheets[index] = timesheet;
        });
    },
    addRow: function(id, entry) {
        findTimesheetIndex(id, function(index) {
            _timesheets[index].entries.push(entry);
        });
    },
    deleteRow: function(id, rowIndex) {
        findTimesheetIndex(id, function(index) {
            _timesheets[index].entries[rowIndex].delete = true;
        });
    },
    updateEntry: function(id, rowIndex, accessor, data) {
        // console.log("id:" + id);
        // console.log(rowIndex);
        findTimesheetIndex(id, function(index) {
            // console.log(_timesheets[index].entries[rowIndex]
            //    [accessor]);
            _timesheets[index].entries[rowIndex][accessor] =
                data;
        });
    },
    updateMeta: function(id, accessor, data) {
        findTimesheetIndex(id, function(index) {
            _timesheets[index][accessor] = data;
        });
    },
    syncTimesheets: function(timesheets){
        _timesheets = timesheets;
    }
}, function(payload) {
    if (payload.actionType === "NEW_TIMESHEET") {
        this.newTimesheet(payload.timesheetID, payload.userID);
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
    if (payload.actionType === "UPDATE_ENTRY") {
        this.updateEntry(payload.data.id, payload.data.index, payload.data
            .accessor, payload.data.value);
        this.emitChange();
    }
    if (payload.actionType === "UPDATE_META") {
        this.updateMeta(payload.data.id, payload.data.accessor, payload
            .data.value);
        this.emitChange();
    }
    if (payload.actionType === "DELETE_TIMESHEETS") {
        this.deleteTimesheets();
        this.emitChange();
    }
    if (payload.actionType === "SYNC_TIMESHEET") {
        this.syncTimesheets(payload.timesheets);
        this.emitChange();
    }
});

var findTimesheetIndex = function(id, callback) {
    // returns the index of the timesheet if it exists and null otherwise

    for (index = 0; index < _timesheets.length; index++) {

        if (_timesheets[index].timesheetID === id) {
            return callback(index);
        }
    }
    return callback(null);
};

var _resetTimesheets = [{
    "timesheetID": "8d741119-9b92-4fea-b64c-3b7854e40665",
    "startDate": "2015-01-01",
    "endDate": "2015-01-15",
    "userID": "0000001",
    "approved": false,
    "engagement": 86328,
    "entries": [{
        "date": "2015-03-02",
        "duration": 4,
        "type": "Access Drive",
        "delete": false
    }, {
        "date": "2015-03-02",
        "duration": 2,
        "type": "Access Drive",
        "delete": false
    }, {
        "date": "2015-03-02",
        "duration": 6,
        "type": "Access Drive",
        "delete": false
    }]
}, {
    "timesheetID": "6629c93e-9292-45e9-bfa2-e0c006ba1e40",
    "startDate": "2015-02-01",
    "endDate": "2015-02-15",
    "userID": "0000001",
    "approved": false,
    "engagement": 86328,
    "entries": [{
        "date": "2015-03-02",
        "duration": 4,
        "type": "Access Drive",
        "delete": false
    }, {
        "date": "2015-03-02",
        "duration": 2,
        "type": "Access Drive",
        "delete": false
    }, {
        "date": "2015-03-02",
        "duration": 6,
        "type": "Access Drive",
        "delete": false
    }]
}];

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

var cloneObject = function(obj) {
    //a trick to deep clone an object
    return (JSON.parse(JSON.stringify(obj)));
};
module.exports = timesheetStore;
