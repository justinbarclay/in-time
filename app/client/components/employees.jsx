var React = require("react");
var Employee = require('./employees/employee');

//Actions
var employeeActions = require("../actions/employeeActions");
var employeeStore = require("../stores/employeeStore");
var authActions = require("../actions/authActions");

var Employees = React.createClass({
    displayName: "Employees",
    propTypes: {},
    mixins: [employeeStore.mixin],
    getInitialState: function(){
        return({
            options: ["Staff", "Supervisor"],
            employees: employeeActions.getEmployees(),
        });
    },
    storeDidChange: function(){
        this.setState({employees: employeeActions.getEmployees()});
    },
    buildEmployees: function(employees){
        var list = employees.map(function(employee, index){
            return (<Employee key={index} email={employee.email} supervisor={employee.supervisor} supervisors={employeeActions.getSupervisors()}/>);
        });
        return (
            <div className="">
                {list}
            </div>
        );
    },
    render: function(){
        var employees = this.buildEmployees(this.state.employees);
        return (
            <div className="employeesContainer">
                <div>
                    <div className="title">Position</div>
                    <div className="title">Supervisor</div>
                </div>
                {employees}

            </div>
        );
    }
});

module.exports = Employees;
