var React = require('react');

//Containers
var Timesheet = require('./timesheet');
var MobileTimesheet = require('./mobileTimesheet/m-timesheet');

var Container = React.createClass({
    displayName: "Container",
    getInitialState: function(){
        return ({
            resizeID: null,
            viewWidth: window.innerWidth
        });
    },
    setWidth: function(){
        var currentWidth = window.innerWidth;
        if(currentWidth !== this.state.viewWidth){
            this.setState({
                viewWidth: currentWidth,
                queue: false
            });
        } else{
            this.setState({
                queue: false
            });
        }
    },
    updateViewWidth: function(){
        if(!this.state.queue){
            requestAnimationFrame(this.setWidth);
            this.state.queue = true;
        }
    },
    setContainer: function(size){
        return (size > 1000? <Timesheet {...this.props}/>: <MobileTimesheet {...this.props}/>);
    },
    componentDidMount: function(){
        this.setState({
            resizeID:window.addEventListener("resize", this.updateViewWidth),
            queue: false
        });

    },
    componentWillUnmount: function(){
        if(this.state.resizeID){
            window.removeEventListener(this.state.resizeID);
        }
    },
    render(){
        return  (
            <div>
                {this.setContainer(this.state.viewWidth)}
            </div>
        );
    }
});

module.exports = Container;
