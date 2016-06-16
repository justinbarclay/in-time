var React = require('react');
var Dropdown = require('react-dropdown').default;

var employeeActions = require('../../actions/employeeActions');

var Employee = React.createClass({
    displayName: "Employee",
    propTypes: {},
    mixins: [],
    getInitialState: function(){
        return ({
                options: ["Staff", "Supervisor"],
                id: this.props.params.id
                });
    },
    storeDidChange: function(){
        this.setState({employees: employeeActions.getEmployees()});
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
                <label>{this.props.email}</label>
                <Dropdown className="employeeDropdown" ref="role" options={this.state.options} onChange={this._onSelectRole} value={this.props.role}/>
                <Dropdown className="employeeDropdown" ref="supervisor" options={this.props.supervisors} onChange={this._onSelectSup} value={this.props.supervisor}/>
            </div>);
    }
});

module.exports = Employee;
