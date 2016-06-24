var Flux = require("../biff");
var authActions = require('./authActions');
var employeeStore = require('../stores/employeeStore');
var staffStore = require('../stores/staffStore');

// Set of allowed actions
var demoActions = Flux.createActions({
    loadDemo: function(role){
        var user;
        if(role === "Owner"){
            user = {
                "email": "owner@timescape.tech",
                "password": "password"
            };
        } else if(role === "Supervisor"){
            user = {
                "email": "dduchovny@timescape.tech",
                "password": "password"
            };
        } else if(role === "Staff"){
            user = {
                "email": "trussel@timescape.tech",
                "password": "password"
            };
        }
        authActions.signIn(user);
    }
});
module.exports = demoActions;

function findStaff(supervisorID, employees){
    return employees.filter(function(staff){
        if(staff.supervisorID === supervisorID){
            return true;
        }
        return false;
    });
}
