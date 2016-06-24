var React = require('react');
var Dropdown = require('react-dropdown').default;

var employeeActions = require('../../actions/employeeActions');
var Message = require('../messageNew');
var Employee = React.createClass({
    displayName: "Employee",
    propTypes: {},
    mixins: [],
    getInitialState: function(){
        return ({
                options: ["Staff", "Supervisor", "Owner"],
                supervisors: employeeActions.getSupervisors(),
                employee: employeeActions.getEmployee(this.props.params.id)
                });
    },
    componentWillMount: function(){
        this.setState({employee: employeeActions.getEmployee(this.props.params.id)});
    },
    storeDidChange: function(){
        this.setState({employee: employeeActions.getEmployee(this.props.params.id)});
    },
    _onSelect: function(accessor, value){
        employeeActions.update(this.state.employee.id, accessor, value);
    },
    _onSelectRole: function(option){
        this._onSelect("role", option.value);
    },
    _onSelectSupervisor: function(option){
        this._onSelect("supervisor", option.value);
    },
    updateEmployee: function(){
        var supervisorID = employeeActions.getSupervisorID(this.state.employee.supervisor);
        employeeActions.updateEmployee(this.state.employee.id, supervisorID, this.state.employee.role);
    },
    render: function(){
        return (
            <div className="employeeContainer">
                <Message accessor="employee" hidden={true} />
                <div className="employeeRow">
                    <label>{this.state.employee.email}</label>
                    <label>Role:
                        <Dropdown className="employeeDropdown" ref="role" options={this.state.options} onChange={this._onSelectRole} value={this.state.employee.role}/>
                    </label>
                    <label>Supervisor:
                        <Dropdown className="employeeDropdown" ref="supervisor" options={this.state.supervisors} onChange={this._onSelectSupervisor} value={this.state.employee.supervisor}/>
                    </label>
                    <div className="button" onClick={this.updateEmployee}>Save</div>
                </div>
            </div>
        );
    }
});

module.exports = Employee;
