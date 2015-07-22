var React = require("react");

//Child Components
var TextEntry = require("./textentry");


var TimesheetRow = React.createClass({
    displayName: "Timesheet",
    mixins: [],
    propTypes: [],
    getInitialState: function() {
        return null;
    },
    handleChange: function(){
        console.log("Something is changing!");
    },
    buildRow: function(){
        self = this;
        keys = Object.keys(this.props.entry);
        var row = keys.map(function(key) {
                return <TextEntry
                        className="timesheetInput"
                        value={self.props.entry[key]}
                        defaultValue={key}
                        inputCallback={self.handleChange} />;
         });
         return (
             <div className="row">
             {row}
            </div>
        );

    },
    render: function() {
        var row = this.buildRow();
        console.log(this.props.entry);
        return (
            <div className="timesheetRow">
                {row}
            </div>
        );
    }
});

module.exports = TimesheetRow;
