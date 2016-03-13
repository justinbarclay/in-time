var React = require("react");

//Actions
var timesheetActions = require("../actions/timesheetActions");

var Approve = React.createClass({
    displayName: "approve",
    propTypes: {},
    mixins: [],
    getInitialState: function(){
        return({
            timesheetID: this.props.timesheetID
        });
    },
    approve: function(){
        data ={
        id: this.props.id,
        accessor: this.props.accessor,
        index: this.props.index,
        value: this.approve};

        timesheetActions.approveTimesheet({id:this.state.timesheetID, accessor:"approve", data: blah});
    },
    render: function(){
        return (
            <div className="button approve" onClick={this.approve}>Approve</div>
        );
    }
});

module.exports = Approve;
