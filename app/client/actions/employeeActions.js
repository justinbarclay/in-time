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
            var res = JSON.parse(AJAXreq.responseText);
            if (AJAXreq.readyState === 4) {
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
            var res = JSON.parse(AJAXreq.responseText);
            if (AJAXreq.readyState === 4) {
                newJWT = AJAXreq.getResponseHeader("X-ACCESS-TOKEN");
                authActions.setJWT(newJWT);
                self.dispatch({
                    actionType: "SET_STAFF",
                    data: res.data
                });
            }
        };
    },
    update: function(email, accessor, value){
        this.dispatch({
            actionType: "CHANGE",
            email: email,
            accessor: accessor,
            value: value
        });
    },
    getEmployees: function(){
        var employees = employeeStore.getEmployees();
            return employees;
    },
    getSupervisors: function(){
        var supervisors = employeeStore.getSupervisors();
        return supervisors.map(function(supervisor){
            return supervisor.email;
        });
    }
});

module.exports = employeeActions;
