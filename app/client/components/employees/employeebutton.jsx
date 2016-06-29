var React = require('react');
var browserHistory = require('react-router').browserHistory;

var EmployeeButton = React.createClass({
    displayName: "Employee",
    propTypes: {},
    mixins: [],
    loadEmployee: function(){
        browserHistory.push("employee/"+this.props.id);
    },
    render: function(){
        return (
            <div className="employee button" onClick={this.loadEmployee}>
                {this.props.email}
                <br/>
                {this.props.role}
            </div>);
    }
});

module.exports = EmployeeButton;
