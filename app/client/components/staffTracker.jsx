var React = require("react");
var staffActions = require("../actions/staffActions");

// Sub-component
var StaffInfo = require("./staffInfo");

var StaffTracker = React.createClass({
    displayName: "StaffTracker",
    propTypes: [],
    mixins: [],
    getInitialState: function(){
        return({staff: staffActions.getStaff()});
    },
    render: function(){
        staff = this.state.staff.map(function(staff, index){
            console.log(staff);
            return <StaffInfo staff={staff.name} hours={staff.hours} key={index}/>;
        });
        return(
            <div className="staffContainer">{staff}</div>
        );
    }
});

module.exports = StaffTracker;
