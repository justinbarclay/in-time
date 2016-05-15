var employeeStore = require('../stores/employeeStore');
var authActions = require('./authActions');

var Flux = require("../biff");

var employeeActions = Flux.createActions({
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
        console.log("Sync called");
        AJAXreq.onreadystatechange = function() {
            var res = JSON.parse(AJAXreq.responseText);
            console.log("Employees: " + res.data);
            console.log(AJAXreq.readyState);
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
    update: function(email, accessor, value){
        this.dispatch({
            actionType: "CHANGE",
            email: email,
            accessor: accessor,
            value: value
        });
    },
    getEmployees: function(name){
        var employees = employeeStore.getEmployees();
        if(!name){
            return employees;
        }
    },
    getSupervisors: function(){
        console.log("Made it here");
        var supervisors = employeeStore.getSupervisors();
        console.log("Supervisors: " + JSON.stringify(supervisors));
        return supervisors.map(function(supervisor){
            return supervisor.email;
        });
    }
});

module.exports = employeeActions;
