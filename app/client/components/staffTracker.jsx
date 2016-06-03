var React = require("react");
var staffActions = require("../actions/staffActions");
var employeeActions = require("../actions/employeeActions");
var authActions = require("../actions/authActions");
var staffStore = require("../stores/staffStore");
// Sub-component
var StaffInfo = require("./staffInfo");

var StaffTracker = React.createClass({
    displayName: "StaffTracker",
    propTypes: [],
    mixins: [staffStore.mixin],
    getInitialState: function(){
        return({staff: staffActions.getAllStaff()});
    },
    storeDidChange: function(){
        this.setState({staff: staffActions.getAllStaff()});
    },
    componentWillMount: function(){
        employeeActions.syncEmployees(authActions.getUserInfo().id);
    },
    render: function(){
        staff = this.state.staff.map(function(staff, index){
            return <StaffInfo staff={staff.email} hours={staff.hours || null} key={index}/>;
        });
        return(
            <div className="staffContainer">
                {staff}
            </div>
        );
    }
});

module.exports = StaffTracker;
