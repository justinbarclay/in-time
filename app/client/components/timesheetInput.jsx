var React = require("react");
var timesheetActions = require('../actions/timesheetActions');
//Child Components
var TextEntry = require("./textentry");

var TimesheetInput = React.createClass({
    displayName: "timesheetInput",
    mixins: [],
    propTypes: [],
    getInitialState: function() {
        return {
            value: null
        };
    },
    handleChange: function(entry) {
        timesheetActions.updateItem(entry);
        console.log("handle change");
    },
    render: function() {
        console.log(this.props.value);
        return (
            <TextEntry
                ref="input"
                id={this.props.id}
                index={this.props.index}
                inputCallback={this.handleChange}
                accessor={this.props.accessor}
                type={this.props.type}
                className={this.props.className}
                value={this.props.value} />
        );
    }
});

module.exports = TimesheetInput;

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
