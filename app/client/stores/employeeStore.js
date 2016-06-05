var Flux = require('../biff');

// initialize the store
// this is a simple object, because I only want to store one authenticated user at a time
var _employees = [];

var employeeStore = Flux.createStore({
    syncEmployees: function(employees){
        _employees = employees;
    },
    getEmployees: function(){
        return _employees;
    },
    getSupervisors: function(){
        var supervisors = _employees.filter(findSup);
        return supervisors;
    },
    change: function(email, accessor, value){
        for(i=0; i<_employees.length; i++){
            if(_employees[i] === email){
                _employees[i].accessor = value;
                return;
            }
        }
    }
    }, function(payload){
        if(payload.actionType === "CHANGE"){
            this.change(payload.email, payload.accessor, payload.value);
            this.emitChange();
        }
        if(payload.actionType === "SYNC_EMPLOYEES"){
            this.syncEmployees(payload.employees);
            this.emitChange();
        }
});
function findSup(employee){
    if(employee.role === "Supervisor"){
        return true;
    }
    return false;
}
module.exports = employeeStore;
