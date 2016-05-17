var React = require('react');

var TimesheetRow = React.creatClass({
    displayName: "Mobile TimesheetRow",
    mixins: [],
    render: function(){
        return (<div className="m-TimesheetRow">
            {this.props.date}
            {this.props.duration}
            {this.props.distance || null}
            {this.props.service}
        </div>);
    }
});

module.exports = TimesheetRow;
