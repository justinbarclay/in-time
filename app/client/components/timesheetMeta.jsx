var React = require('react');

//Sub Components
var TextEntry = require('./textentry');

var TimesheetMeta = React.createClass({
    displayName: "timesheetMeta",
    propTypes: [],
    getInitialState: function() {
        return null;
    },
    handleInputChange: function(meta) {},
    buildMeta: function (field, index){
        console.log(field);
        return <TextEntry
            className="metaInfo"
            key={index}
            id={this.props.timesheet.id}
            type={field.type}
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
