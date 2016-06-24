var employeeStore = require('../stores/employeeStore');
var authActions = require('./authActions');
var staffStore = require('../stores/staffStore');
var messageActions = require('./messageActions');

var Flux = require("../biff");

var employeeActions = Flux.createActions({
    syncAllEmployees: function(userID){
        self = this;
        user = JSON.stringify({id: userID});
        var AJAXreq = new XMLHttpRequest();
        AJAXreq.open("POST", "/api/allemployees", true);
        AJAXreq.setRequestHeader('ContentType', 'application/json; charset=UTF8');
        AJAXreq.setRequestHeader('X-ACCESS-TOKEN', authActions.getJWT());
        AJAXreq.setRequestHeader('ContentType',
            'application/json; charset=UTF8');
        AJAXreq.send(user);
        AJAXreq.onreadystatechange = function() {
            if (AJAXreq.readyState === 4) {
                var res = JSON.parse(AJAXreq.responseText);
                newJWT = AJAXreq.getResponseHeader("X-ACCESS-TOKEN");
                authActions.setJWT(newJWT);
                self.dispatch({
                    actionType: "SYNC_EMPLOYEES",
                    employees: res.data
                });
            }
        };
    },
    syncEmployees: function(userID){
        self = this;
        user = JSON.stringify({id: userID});
        var AJAXreq = new XMLHttpRequest();
        AJAXreq.open("POST", "/api/employees", true);
        AJAXreq.setRequestHeader('ContentType', 'application/json; charset=UTF8');
        AJAXreq.setRequestHeader('X-ACCESS-TOKEN', authActions.getJWT());
        AJAXreq.setRequestHeader('ContentType',
            'application/json; charset=UTF8');
        AJAXreq.send(user);
        AJAXreq.onreadystatechange = function() {
            if (AJAXreq.readyState === 4) {
                var res = JSON.parse(AJAXreq.responseText);
                newJWT = AJAXreq.getResponseHeader("X-ACCESS-TOKEN");
                authActions.setJWT(newJWT);
                self.dispatch({
                    actionType: "SET_STAFF",
                    data: res.data
                });
            }
        };
    },
    updateEmployee: function(id, supervisor, role){
        var employee = {id: id, supervisor: supervisor, role: role};
        var AJAXreq = new XMLHttpRequest();
        AJAXreq.open("POST", "/api/employee", true);
        AJAXreq.setRequestHeader('ContentType', 'application/json; charset=UTF8');
        AJAXreq.setRequestHeader('X-ACCESS-TOKEN', authActions.getJWT());
        AJAXreq.setRequestHeader('ContentType',
            'application/json; charset=UTF8');
        AJAXreq.send(JSON.stringify(employee));
        AJAXreq.onreadystatechange = function() {
            if (AJAXreq.readyState === 4) {
                var res = JSON.parse(AJAXreq.responseText);
                newJWT = AJAXreq.getResponseHeader("X-ACCESS-TOKEN");
                authActions.setJWT(newJWT);
                messageActions.addMessage("employee", res.message, res.success);
            }
        };
    },
    update: function(id, accessor, value){
        this.dispatch({
            actionType: "CHANGE",
            id: id,
            accessor: accessor,
            value: value
        });
    },
    getEmployees: function(){
            return employeeStore.getEmployees();
    },
    getEmployee: function(id){
        return employeeStore.getEmployee(id);
    },
    getSupervisors: function(){
        var supervisors = employeeStore.getSupervisors();
        return supervisors.map(function(supervisor){
            return supervisor.email;
        });
    },
    getSupervisorID: function(supervisor){
        return employeeStore.getSupervisorID(supervisor);
    },
    clearAll: function(){
        this.dispatch({
            actionType: "CLEAR_ALL"
        });
    },
    signOut: function(){
        return employeeStore.signOut();
    }
});

module.exports = employeeActions;
