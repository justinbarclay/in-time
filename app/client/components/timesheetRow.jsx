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
    handleChange: function() {
        var newValue = this.refs.input.getDOMNode().value;

        timesheetActions.inputChanged({
            _id: this.props._id,
            accessor: this.props.accessor,
            index: this.props.index,
            value: newValue
        });

        this.setState({
            value: newValue
        });
    },
    buildRow: function(field, index) {
        var type = (field.accessor === 'date') ? 'date' : 'text';
        return <TextEntry
                className="timesheetInput"
                inputCallback={this.handleChange}
                key={index}
                type={type}
                ref="input"
                value={this.props.entry[field.accessor]} />;
    },
    render: function() {
        var row = this.props.fields.map(this.buildRow);
        console.log(this.props.entry);
        return (
            <div className="timesheetRow">
                {row}
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
