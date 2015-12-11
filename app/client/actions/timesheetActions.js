var Flux = require("../biff");
var timesheetStore = require('../stores/timesheetStore');
var _ = require("underscore");

var timesheetActions = Flux.createActions({
    syncTimesheets: function(userID) {
        self = this;
        user = JSON.stringify({userID: userID});
        // console.log("user", user);
        var AJAXreq = new XMLHttpRequest();
        AJAXreq.open("POST", "/timesheets", true);
        AJAXreq.setRequestHeader('ContentType', 'application/json; charset=UTF8');
        // console.log("timesheet actions", 12);
        currentJWT = localStorage.getItem('JWT');
        AJAXreq.setRequestHeader('X-ACCESS-TOKEN', currentJWT);
        AJAXreq.setRequestHeader('ContentType',
            'application/json; charset=UTF8');
        AJAXreq.send(user);
        // console.log("timesheet actions", 18);
        AJAXreq.onreadystatechange = function() {
            var res = JSON.parse(AJAXreq.responseText);
            if (AJAXreq.readyState === 4) {
                newJWT = AJAXreq.getResponseHeader(
                    "X-ACCESS-TOKEN");
                if (newJWT) {
                    localStorage.setItem('JWT', newJWT);
                }
                console.log(res);
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
    newTimesheet: function(timesheetID, userID) {
        this.dispatch({
            actionType: "NEW_TIMESHEET",
            timesheetID: timesheetID,
            userID: userID
        });
    },
    addRow: function(id, entry) {
        // console.log('action');
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
        // console.log("updateEntry");
        this.dispatch({
            actionType: "UPDATE_ENTRY",
            data: entry
        });
    },
    updateMeta: function(meta) {
        // console.log("updateMeta");
        this.dispatch({
            actionType: "UPDATE_META",
            data: meta
        });
    },
    saveTimesheet: function(id){
        var timesheet = formatTimesheet(timesheetStore.getTimesheet(id));
        var verify = verifyTimesheet(timesheet);
        console.log(verify);
        if(verify !== []){
            for(var message in verify){
                console.log("error");
                console.log(verify[message]);
            }
            return;
        }

        var AJAXreq = new XMLHttpRequest();
        AJAXreq.open("POST", "/timesheet", true);
        AJAXreq.setRequestHeader('ContentType', 'application/json; charset=UTF8');
        var currentJWT = localStorage.getItem('JWT');
        AJAXreq.setRequestHeader('X-ACCESS-TOKEN', currentJWT);
        AJAXreq.setRequestHeader('ContentType',
            'application/json; charset=UTF8');
        AJAXreq.send(JSON.stringify(timesheet));
        AJAXreq.onreadystatechange = function() {
            var res = JSON.parse(AJAXreq.responseText);
            console.log(res);
            if (AJAXreq.readyState === 4) {
                newJWT = AJAXreq.getResponseHeader(
                    "X-ACCESS-TOKEN");
                if (newJWT) {
                    localStorage.setItem('JWT', newJWT);
                }
                return res;
            }
        };

    }
});

module.exports = timesheetActions;

function formatTimesheet(timesheet){
    var formattedTimesheet = {
        timesheetID: timesheet.timesheetID,
        engagement: timesheet.engagement,
        startDate: new Date(timesheet.startDate),
        endDate: new Date(timesheet.endDate),
        userID: timesheet.userID,
        entries: []
    };
    formattedTimesheet.entries = timesheet.entries.map(function(entry){
        return {
            service: entry.service,
            date: new Date(entry.date),
            duration: entry.duration
        };
    });
    return formattedTimesheet;
}

function verifyTimesheet(timesheet){
    var messages = [];

    messages.push(verifyMeta(timesheet));

    for(var entry in timesheet.entries){
        messages = messages.concat( verifyEntry(entry));
    }

   return _.flatten(messages);

}

function verifyMeta(timesheet){
    var messages = [];
    if(!checkInt(timesheet.timesheetID)) {
        messages.push("TimesheetID needs to be not blank");
    }
    if(!checkStr(timesheet.startDate)) {
           messages.push("Please enter a start date");
    }
    if(!checkStr(timesheet.endDate)) {
        messages.push("Please enter an end date");
    }
    return messages;

}

function verifyEntry(entry){
    var messages = [];

    if(!checkStr(entry.date)) {
        messages.push("Please enter an end date");
    }
    if(!checkInt(entry.duration)) {
        messages.push("Please enter a duration for your entry");
    }
    if(!checkStr(entry.type)){
        messages.push("Please select a service type");
    }
    return messages;
}

function checkInt(data){
    if(data === null || data !== parseInt(data, 10)){
        return false;
    }
    return true;
}

function checkStr(data){
    if(data === "" || typeof data !== "string"){
        return false;
    }
    return true;
}
