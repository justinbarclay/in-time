var React = require("react");

// Sub-component

var StaffInfo = React.createClass({
    displayName: "StaffTracker",
    propTypes: [],
    mixins: [],
    getInitialState: function(){
        return({staff: this.props.staff, hours: this.props.hours});
    },
    render: function(){
        return (
            <div className="staffInfo">
                <div>{this.state.staff}</div>
                <div>{this.state.hours} </div>
            </div>
        );
    }
});

module.exports = StaffInfo;
