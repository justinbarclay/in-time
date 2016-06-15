var React = require('react');
var hashHistory = require('react-router').hashHistory;

var EmployeeButton = React.createClass({
    displayName: "Employee",
    propTypes: {},
    mixins: [],
    loadEmployee: function(){
        hashHistory.push(`employee/$this.props.id`);
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
