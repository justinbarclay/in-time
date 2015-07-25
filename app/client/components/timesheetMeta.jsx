var React = require('react');

//Sub Components
var TextEntry = require('./textentry');

var TimesheetMeta = React.createClass({
    displayName: "timesheetMeta",
    propTypes: [],
    getInitialState: function(){
        return null;
    },
    handleInputChange: function(meta){

    },
    render: function(){
        //Ooooh god what am I doing?
        <TextEntry
        ref="input"
        id={this.props.id}
        index={this.props.index}
        inputCallback={this.handleChange}
        accessor={this.props.accessor}
        type={this.props.type}
        className={this.props.className}
        value={this.props.value}/>;
    }
});
