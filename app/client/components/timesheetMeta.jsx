var React = require('react');
var timesheetActions = require('../actions/timesheetActions');

//Sub Components
var TextEntry = require('./textentry');

var TimesheetMeta = React.createClass({
    displayName: "timesheetMeta",
    propTypes: [],
    getInitialState: function() {
        return null;
    },
    handleChange: function(meta) {
        delete meta.index;
        timesheetActions.updateMeta(meta);
    },
    buildMeta: function (field, index){
        return <TextEntry
            className="metaInfo"
            accessor={field.accessor}
            key={index}
            id={this.props.timesheet.timesheetID}
            type={field.type}
            inputCallback={this.handleChange}
            value={this.props.timesheet[field.accessor]} />;
    },
    render: function() {

        var meta = this.props.fields.map(this.buildMeta);
        return (
            <div>
                {meta}
            </div>
        );
    }
});

module.exports = TimesheetMeta;
