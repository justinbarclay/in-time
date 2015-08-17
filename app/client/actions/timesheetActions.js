var Flux = require("../biff");
var timesheetStore = require('../stores/timesheetStore');

var timesheetActions = Flux.createActions({
    syncTimesheets: function(userID) {
        self = this;
        user = JSON.stringify({userID: userID});
        console.log("user", user);
        var AJAXreq = new XMLHttpRequest();
        AJAXreq.open("POST", "/timesheets", true);
        AJAXreq.setRequestHeader('ContentType', 'application/json; charset=UTF8');
        console.log("timesheet actions", 12);
        currentJWT = localStorage.getItem('JWT');
        AJAXreq.setRequestHeader('X-ACCESS-TOKEN', currentJWT);
        AJAXreq.setRequestHeader('ContentType',
            'application/json; charset=UTF8');
        AJAXreq.send(user);
        console.log("timesheet actions", 18);
        AJAXreq.onreadystatechange = function() {
            console.log("timesheet actions", 20);
            console.log("state change");
            var res = JSON.parse(AJAXreq.responseText);
            console.log(res);

            if (AJAXreq.readyState === 4) {
                newJWT = AJAXreq.getResponseHeader(
                    "X-ACCESS-TOKEN");
                console.log(newJWT);
                if (newJWT) {
                    localStorage.setItem('JWT', newJWT);
                }
                self.dispatch({
                    actionType: "SYNC_TIMESHEET",
                    timesheets: res
                });
            }
        };
    },
    getTimesheets: function(){
        return timesheetStore.getTimesheets();
    },
    getTimesheet: function(id) {
        return timesheetStore.getTimesheet(id);
    },
    deleteTimesheets: function() {
        this.dispatch({
            actionType: "DELETE_TIMESHEETS"
        });
    },
    newTimesheet: function(id) {
        this.dispatch({
            actionType: "NEW_TIMESHEET",
            id: id
        });
    },
    addRow: function(id, entry) {
        console.log('action');
        this.dispatch({
            actionType: "ADD_ROW",
            id: id,
            entry: entry
        });
    },
    deleteRow: function(id, index) {
        this.dispatch({
            actionType: "DELETE_ROW",
            id: id,
            index: index
        });
    },
    updateEntry: function(entry) {
        console.log("actions");
        this.dispatch({
            actionType: "UPDATE_ENTRY",
            data: entry
        });
    },
    updateMeta: function(meta) {
        console.log("actions");
        this.dispatch({
            actionType: "UPDATE_META",
            data: meta
        });
    }
});

module.exports = timesheetActions;
