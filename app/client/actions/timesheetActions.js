var Flux = require("../biff");
var moment = require("moment");
var timesheetStore = require('../stores/timesheetStore');
var authActions = require("./authActions");
var _ = require("underscore");
var messageActions = require('./messageActions');

var timesheetActions = Flux.createActions({
    syncTimesheets: function(userID) {
        self = this;
        user = JSON.stringify({userID: userID});
        var AJAXreq = new XMLHttpRequest();
        AJAXreq.open("POST", "/api/timesheets", true);
        AJAXreq.setRequestHeader('ContentType', 'application/json; charset=UTF8');
        AJAXreq.setRequestHeader('X-ACCESS-TOKEN', authActions.getJWT());
        AJAXreq.setRequestHeader('ContentType', 'application/json; charset=UTF8');
        AJAXreq.send(user);
        AJAXreq.onreadystatechange = function() {
            if (AJAXreq.readyState === 4) {
                var res = JSON.parse(AJAXreq.responseText);
                newJWT = AJAXreq.getResponseHeader("X-ACCESS-TOKEN");
                authActions.setJWT(newJWT);
                self.dispatch({
                    actionType: "SYNC_TIMESHEET",
                    userID: userID,
                    timesheets: res
                });
            }
        };
    },
    getTimesheets: function(userID){
        return timesheetStore.getTimesheets(userID);
    },
    getTimesheet: function(userID, id) {
        return timesheetStore.getTimesheet(userID, id);
    },
    grabTimesheet: function(userID, id){
        request = {
            userID: userID,
            timesheetID: id
        };
        data = ajax("POST", "/api/findTimesheet", request);
        if(data){
            timesheet = formatTimesheet(data);
            this.dispatch({
                actionType: "ADD_TIMESHEET",
                data: timesheet
            });
        }
    },
    deleteTimesheet: function(userID, id) {
        this.dispatch({
            actionType: "DELETE_TIMESHEET",
            userID: userID,
            timesheetID: id
        });
        save(id);

    },
    deleteTimesheets: function() {
        this.dispatch({
            actionType: "DELETE_TIMESHEETS",
        });
    },
    newTimesheet: function(userID, timesheetID) {
        this.dispatch({
            actionType: "NEW_TIMESHEET",
            timesheetID: timesheetID,
            userID: userID
        });
    },
    addRow: function(userID, id, entry) {
        this.dispatch({
            actionType: "ADD_ROW",
            userID: userID,
            id: id,
            entry: entry
        });
    },
    deleteRow: function(userID, id, index) {
        this.dispatch({
            actionType: "DELETE_ROW",
            userID: userID,
            id: id,
            index: index
        });
    },
    updateEntry: function(entry) {
        this.dispatch({
            actionType: "UPDATE_ENTRY",
            data: entry
        });
    },
    updateMeta: function(meta) {
        this.dispatch({
            actionType: "UPDATE_META",
            data: meta
        });
    },
    saveTimesheet: function(userID, id){
        save(userID, id);

    },
    approveTimesheet: function(meta){
        ajax("POST", "/api/approve", {timesheetID: meta.id, action:"approve"});
        this.dispatch({
            actionType: "UPDATE_META",
            data: meta
        });
    },
    findRow: function(userID, id, row){
        return timesheetStore.findRow(userID, id, row);
    },
    clearAll: function(){
        this.dispatch({
            actionType: "CLEAR_ALL"
        });
    }
});

module.exports = timesheetActions;

///////////////////////////////////////////////////////////////////////////////
//
// Helper Functions
//
///////////////////////////////////////////////////////////////////////////////
function save(userID, id){
    var verify = [];
    var timesheet = formatTimesheet(timesheetStore.getTimesheet(userID, id));
    verify = verifyTimesheet(timesheet);
    if(verify.length !== 0){
        for(var index in verify){
            // Add each message into the queue for the timesheet
            messageActions.addMessage("timesheet", verify[index]);
        }
    } else {
        ajax("POST", "/api/timesheet", timesheet);
    }
}

function ajax(method, route, data){
    var AJAXreq = new XMLHttpRequest();
    AJAXreq.open(method, route, true);
    AJAXreq.setRequestHeader('ContentType', 'application/json; charset=UTF8');
    var currentJWT = localStorage.getItem('JWT');
    AJAXreq.setRequestHeader('X-ACCESS-TOKEN', currentJWT);
    AJAXreq.setRequestHeader('ContentType',
        'application/json; charset=UTF8');
    AJAXreq.send(JSON.stringify(data));
    AJAXreq.onreadystatechange = function() {
        if (AJAXreq.readyState === 4) {
            var res = JSON.parse(AJAXreq.responseText);
            jwt = AJAXreq.getResponseHeader("X-ACCESS-TOKEN");
            authActions.setJWT(jwt);
            messageActions.addMessage("timesheet", res.message);
            return res;
        }
    };
}
function formatTimesheet(timesheet){
    var formattedTimesheet = {
        timesheetID: timesheet.timesheetID,
        engagement: timesheet.engagement,
        startDate: timesheet.startDate?timesheet.startDate.format("YYYY-MM-DD") : null,
        endDate: timesheet.endDate?timesheet.endDate.format("YYYY-MM-DD") : null,
        approved: timesheet.approved,
        delete: Boolean(timesheet.delete),
        userID: localStorage.getItem('USER_ID'),
        entries: []
    };
    formattedTimesheet.entries = timesheet.entries.map(function(entry){
        return {
            rowID: entry.rowID,
            service: entry.service,
            date: entry.date? entry.date.format("YYYY-MM-DD") : null,
            duration: entry.duration,
            delete: Boolean(entry.delete)
        };
    });
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
        messages.push("TimesheetID needs to be not blank.");
    }
    if(!checkStr(timesheet.engagement)) {
        messages.push("Please enter an engagement number.");
    }
    if(!checkStr(timesheet.startDate)) {
        messages.push("Please enter a start date.");
    }
    if(!checkStr(timesheet.endDate)) {
        messages.push("Please enter an end date.");
    }
    return messages;

}

function verifyEntry(entry){
    var messages = [];
    if(!checkStr(entry.date)) {
        messages.push("Please check all entries to make sure they have a dates.");
    }
    if(!checkStr(entry.duration)) {
        messages.push("Please check all entries to make sure they have a duration.");
    }
    if(!checkStr(entry.service)){
        messages.push("Please check all entries to make sure they have a service type.");
    }
    return messages;
}

function checkInt(data){
  return !isNaN(parseFloat(data)) && isFinite(data);
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
