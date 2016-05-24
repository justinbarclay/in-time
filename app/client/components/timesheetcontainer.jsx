var React = require('react');

//Containers
var Timesheet = require('./timesheet');
var MobileTimesheet = require('./mobileTimesheet/m-timesheet');

var Container = React.createClass({
    displayName: "Container",
    getInitialState: function(){
        return ({
            intervalid: null,
            viewwidth: window.innerWidth
        });
    },
    pollViewWidth: function(){
        this.setState({viewwidth: window.innerWidth});
    },
    setContainer: function(size){
        return (size > 1000? <Timesheet {...this.props}/>: <MobileTimesheet {...this.props}/>);
    },
    componentDidMount: function(){
        var id = setInterval(this.pollViewWidth, 100);
        this.setState({intervalid:id});
    },
    componentWillUnmount: function(){
        clearInterval(this.state.intervalid);
    },
    shouldComponentUpdate: function(nextProps, nextState){
        return this.state.viewwidth !== nextState.viewwidth;
    },
    render(){
        return  (
            <div>
                {this.setContainer(this.state.viewwidth)}
            </div>
        );
    }
});

module.exports = Container;
