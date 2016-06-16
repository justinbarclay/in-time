var React = require('react');
var Dropdown = require('react-dropdown').default;

var employeeActions = require('../../actions/employeeActions');

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
        employeeActions.update(this.props.email, accessor, value);
    },
    _onSelectRole: function(option){
        this._onSelect("role", option.value);
    },
    _onSelectSupervisor: function(option){
        this._onSelect("supervisor", option.value);
    },
    render: function(){
        return (
            <div className="employeeRow">
                <label>{this.state.employee.email}</label>
                <Dropdown className="employeeDropdown" ref="role" options={this.state.options} onChange={this._onSelectRole} value={this.state.employee.role}/>
                <Dropdown className="employeeDropdown" ref="supervisor" options={this.state.supervisors} onChange={this._onSelectSup} value={this.state.employee.supervisor}/>
            </div>);
    }
});

module.exports = Employee;
