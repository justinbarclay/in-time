// This will store the timesheet available to the user
var Flux = require('../biff');

// initialize the store this will have an array of timesheets, it will probably have one timesheet to start
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

var _timesheets = {
    "timesheetID": "8d741119-9b92-4fea-b64c-3b7854e40665",
    "dateRange": "01/01/2015 - 01/15/2015",
    "userID": "0000001",
    "approved": "",
    "clientID": "",
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
};

var timesheetStore = Flux.createStore({
    getTimesheets: function() {
        return _timesheets;
    },
    createTimesheet: function(timesheet) {
        //append a timesheet to the timesheetStore
        _timesheets.push(timesheet);
    },
    deleteTimesheet: function(id) {
        for (i = 0; i < _timesheets.length; i++) {
            if (_timesheets[i].timesheetID === id) {
                _timesheets.splice(i, 1);
                return;
            }
        }
    },
    updateTimesheet: function(timesheet) {
        for (i = 0; i < _timesheets.length; i++) {
            if (_timesheets[i].timesheetID === timesheet.timesheetID) {
                _timesheets[i] = timesheet;
                return;
            }
        }
    },
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
});

module.exports = timesheetStore;
