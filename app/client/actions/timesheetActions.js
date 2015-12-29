var Flux = require("../biff");
var timesheetStore = require('../stores/timesheetStore');
var authActions = require("./authActions");
var _ = require("underscore");

var timesheetActions = Flux.createActions({
    syncTimesheets: function(userID) {
        self = this;
        user = JSON.stringify({userID: userID});
        var AJAXreq = new XMLHttpRequest();
        AJAXreq.open("POST", "/timesheets", true);
        AJAXreq.setRequestHeader('ContentType', 'application/json; charset=UTF8');
        AJAXreq.setRequestHeader('X-ACCESS-TOKEN', authActions.getJWT());
        AJAXreq.setRequestHeader('ContentType',
            'application/json; charset=UTF8');
        AJAXreq.send(user);
        console.log("Sync called");
        AJAXreq.onreadystatechange = function() {
            var res = JSON.parse(AJAXreq.responseText);
            console.log(res);
            if (AJAXreq.readyState === 4) {
                newJWT = AJAXreq.getResponseHeader(
                    "X-ACCESS-TOKEN");
                authActions.setJWT(newJWT);
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
    deleteTimesheet: function(id) {
        this.dispatch({
            actionType: "DELETE_TIMESHEET",
            timesheetID: id
        });
    },
    deleteTimesheets: function() {
        this.dispatch({
            actionType: "DELETE_TIMESHEETS",
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
        startDate: timesheet.startDate,
        endDate: timesheet.endDate,
        delete: Boolean(timesheet.delete),
        userID: localStorage.getItem('USER_ID'),
        entries: []
    };
    formattedTimesheet.entries = timesheet.entries.map(function(entry){
        return {
            rowID: entry.rowID,
            service: entry.service,
            date: entry.date,
            duration: entry.duration,
            delete: Boolean(entry.delete)
        };
    });
    console.log(formattedTimesheet);
    return formattedTimesheet;
}

function verifyTimesheet(timesheet){
    var messages = [];
    messages.push(verifyMeta(timesheet));

    entries = timesheet.entries;
    for(i=0; i < entries.length; i++){
        messages = messages.concat(verifyEntry(entries[i]));
    }

   return _.flatten(messages);

}

function verifyMeta(timesheet){
    var messages = [];
    if(!checkStr(timesheet.timesheetID)) {
        messages.push("TimesheetID needs to be not blank");
    }
    if(!checkStr(timesheet.engagement)) {
        messages.push("Engagement needs to be not blank");
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
        messages.push("Please a date for the entry");
    }
    if(!checkStr(entry.duration)) {
        messages.push("Please enter a duration for your entry");
    }
    if(!checkStr(entry.service)){
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

function checkDate(data){
    if (!(data instanceof Date) || Object.prototype.toString.call(data) !== '[object Date]'){
        return false;
    }
    return true;
}
