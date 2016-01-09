var uuid = require('uuid');

var RowEditButtons = React.createClass({
    displayName: "row edit",
    propTypes: {},
    mixins: [],
    getInitialState: function(){
        return({
            timesheetID: this.props.timesheetID
        });
    },
    newRow: function() {
        var newRow = {
            "rowID": uuid.v4(),
            "date": "",
            "duration": 0,
            "service": "type of service",
            "delete": false
        };
        return timesheetActions.addRow(this.state.timesheetID, newRow);
    },
    saveTimesheet: function() {
        timesheetActions.saveTimesheet(this.state.timesheetID);
    },
    deleteTimesheet: function() {
        self = this;
        console.log("Hold for 2 seconds");
        this.setState({timer: window.setTimeout(function(){
            self.transitionTo('/timesheets');
            timesheetActions.deleteTimesheet(self.state.timesheetID);
        }, 2000)});
    },
    hoverDelete:function(event){
        (this.state.deleteMessage === "Delete") ? this.setState({deleteMessage:"Hold To Delete"}) : this.setState({deleteMessage:"Delete"});
    },
    render: function (){
        return (
            <div className="newRowContainer">
                <div className="add button" onClick={this.newRow}>
                    +
                </div>
                <div className="save button" onClick={this.saveTimesheet}>
                    Save
                </div>
                <div className="delete button" onMouseDown={this.deleteTimesheet} onMouseUp={this.clearTimeout} onMouseEnter={this.hoverDelete} onMouseLeave={this.hoverDelete}>
                    {this.state.deleteMessage}
                </div>
                {approve}
            </div>
        );
    }
});
