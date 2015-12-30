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
        console.log(this.state);
        return (
            <div>
                hello
                {this.state.staff}
                {this.state.hours}
            </div>
        );
    }
});

module.exports = StaffInfo;
