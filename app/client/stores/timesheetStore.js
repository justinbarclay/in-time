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
    "startDate": "2015-01-01",
    "endDate": "2015-01-15",
    "userID": "0000001",
    "approved": false,
    "engagement": 86328,
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
    getTimesheet: function(id) {
        for (index = 0; index < _timesheets.length; index++) {
            if (_timesheets[index].timesheetID === id) {
                return _timesheets[index];
            }
        }
        return null;
    },
    newTimesheet: function(id) {
        //start a new timesheet
        newTimesheet = cloneObject(_templateTimesheet);
        newTimesheet.timesheetID = id;
        _timesheets = _timesheets.concat(newTimesheet);
    },
    deleteTimesheet: function(id) {
        findTimesheet(id, function(index) {
            _timesheets.splice(index, 1);
        });
    },
    deleteTimesheets: function() {
        newTimesheet = cloneObject(_templateTimesheet);
        newTimesheet.timesheetID = uuid.v4();
        _timesheets = [newTimesheet];
    },
    updateTimesheet: function(timesheet) {
        findTimesheetindex(timesheet.timeoutsheetID, function(index) {
            _timesheets[index] = timesheet;
        });
    },
    addRow: function(id, entry) {
        console.log(id);
        findTimesheetIndex(id, function(index) {
            _timesheets[index].entries.push(entry);
        });
    },
    deleteRow: function(id, rowIndex) {
        findTimesheetIndex(id, function(index) {
            _timesheets[index].entries.splice(rowIndex, 1);
        });
    },
    updateEntry: function(id, rowIndex, accessor, data) {
        console.log("id:" + id);
        console.log(rowIndex);
        findTimesheetIndex(id, function(index) {
            console.log(_timesheets[index].entries[rowIndex]
                [accessor]);
            _timesheets[index].entries[rowIndex][accessor] =
                data;
        });
    },
    updateMeta: function(id, accessor, data) {
        findTimesheetIndex(id, function(index) {
            console.log("id: " + id);
            console.log("index:" + index + " " +
                "accessor: " + accessor);
            console.log(_timesheets[index][accessor]);
            _timesheets[index][accessor] = data;
        });
    }
}, function(payload) {
    if (payload.actionType === "NEW_TIMESHEET") {
        this.newTimesheet(payload.id);
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

var _templateTimesheet = {
    "timesheetID": null,
    "startDate": "",
    "endDate": "",
    "userID": "0000001",
    "approved": false,
    "engagement": "",
    "entries": [{
        "date": "",
        "duration": "0",
        "type": "type of service"
    }]
};

var cloneObject = function(obj) {
    //a tricl to deep clone an object
    return (JSON.parse(JSON.stringify(obj)));
};
module.exports = timesheetStore;
