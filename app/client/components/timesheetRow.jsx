var React = require("react");
var timesheetActions = require('../actions/timesheetActions');
//Child Components
var TimesheetInput = require('./timesheetInput');


var TimesheetRow = React.createClass({
    displayName: "Timesheet",
    mixins: [],
    propTypes: [],
    getInitialState: function() {
        return null;
    },
    buildRow: function(field, index) {
        var type = (field.accessor === 'date') ? 'date' : 'text';
        return <TimesheetInput  accessor={field.accessor}
                                className="timesheetInput"
                                id={this.props.id}
                                key={index}
                                index={this.props.index}
                                type={type}
                                value={this.props.entry[field.accessor]} />;
    },
    deleteRow: function() {
        timesheetActions.deleteRow(this.props.id, this.props.index);
    },
    render: function() {
        var row = this.props.fields.map(this.buildRow);
        return (
            <div className="timesheetRow">
                {row}
                <button className="small-3" onClick={this.deleteRow}>X</button>
            </div>
        );
    }
});

module.exports = TimesheetRow;

// Making it into a table
// buildRow: function(field, index) {
//     return <td><TextEntry
//             className="timesheetInput"
//             inputCallback={this.handleChange}
//             key={index}
//             ref="input"
//             value={this.props.entry[field.accessor]} /></td>;
// },
// render: function() {
//     var row = this.props.fields.map(this.buildRow);
//     console.log(this.props.entry);
//     return (
//         <tr className="timesheetRow">
//             {row}
//         </tr>
//     );
// }
// });
