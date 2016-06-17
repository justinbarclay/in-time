var employeeStore = require('../stores/employeeStore');
var authActions = require('./authActions');
var staffStore = require('../stores/staffStore');

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
        console.log("Sync called");
        AJAXreq.onreadystatechange = function() {
            if (AJAXreq.readyState === 4) {
                var res = JSON.parse(AJAXreq.responseText);
                newJWT = AJAXreq.getResponseHeader("X-ACCESS-TOKEN");
                authActions.setJWT(newJWT);
                console.log(res.data);
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
    signOut: function(){
        return employeeStore.signOut();
    }
});

module.exports = employeeActions;
