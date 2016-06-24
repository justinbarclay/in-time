var Flux = require('../biff');

// initialize the store
// this is a simple object, because I only want to store one authenticated user at a time
var _employees = [];

var employeeStore = Flux.createStore({
    syncEmployees: function(employees){
        if(!employees) return;
        _employees = employees;
    },
    getEmployees: function(){
        return _employees;
    },
    getSupervisors: function(){
        var supervisors = _employees.filter(findSup);
        return supervisors;
    },
    getSupervisorID: function(supervisor){
        for(i=0; i<_employees.length; i++){
            if(_employees[i].email === supervisor){
                return _employees[i].id;
            }
        }
    },
    change: function(id, accessor, value){
        for(i=0; i<_employees.length; i++){
            if(_employees[i].id === id){
                _employees[i][accessor] = value;
                return;
            }
        }
    },
    getEmployee: function(id){
        for(var i=0; i<_employees.length; i++){
            if(_employees[i].id == id){
                return _employees[i];
            }
        }
    },
    clearAll: function(){
        _employees =[];
    }
    }, function(payload){
        if(payload.actionType === "CHANGE"){
            this.change(payload.id, payload.accessor, payload.value);
            this.emitChange();
        }
        if(payload.actionType === "SYNC_EMPLOYEES"){
            this.syncEmployees(payload.employees);
            this.emitChange();
        }
        if(payload.actionType === "CLEAR_ALL"){
            this.clearAll();
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
