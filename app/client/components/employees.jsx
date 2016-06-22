var React = require("react");
var Employee = require('./employees/employee');
var EmployeeButton = require('./employees/employeebutton');
var Link = require('react-router').Link;

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
            options: ["Staff", "Supervisor", "Owner"],
            employees: employeeActions.getEmployees(),
        });
    },
    componentDidMount: function(){
        employeeActions.syncAllEmployees(authActions.getUserInfo().id);
    },
    storeDidChange: function(){
        this.setState({employees: employeeActions.getEmployees()});
    },
    buildEmployees: function(employees){
        if(!employees.length){
            return(
            <div className="employees">
                <p>It looks like you haven't <Link to="invite">invited</Link> anyone yet!</p>
            </div>
        );
        }
        var list = employees.map(function(employee, index){
            return (<EmployeeButton key={index} email={employee.email} role={employee.role} id={employee.id}/>);
            //return (<Employee key={index} email={employee.email} role={employee.role} supervisor={employee.supervisor} supervisors={employeeActions.getSupervisors()}/>);
        });
        return (
            <div className="employees">
                {list}
            </div>
        );
    },
    search: function(event){
        var term = event.target.value.toLowerCase();
        var matchingEmployees = null;
        if(event.target.value){
            var matchTerm = match(term);
            matchingEmployees = this.state.employees.filter(matchTerm);
        }
        this.setState({matchingEmployees: matchingEmployees});
    },
    render: function(){
        var employee;
        if(this.state.matchingEmployees){
            employeeList = this.state.matchingEmployees;
        } else {
            employeeList = this.state.employees;
        }
        var employees = this.buildEmployees(employeeList);
        return (
            <div className="employeesContainer">
                <div className="instruction">
                    <p> Welcome to the Employee Information page, if you're an owner this is the page where you are able to search for staff, set their role, and set their supervisor. If you are not an owner, you should not be here and some code is behaving very naughtily.</p>
                </div>
                <input className="search" placeholder="Please enter an email..." type="text" onKeyUp={this.search}/>
                {employees}
            </div>
        );
    }
});
var match = function(term){
    return function(employee){
      lowerEmail = employee.email.toLowerCase();
      return lowerEmail.includes(term);
  };
};

module.exports = Employees;
