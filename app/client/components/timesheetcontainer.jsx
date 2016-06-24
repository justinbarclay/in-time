var React = require('react');

//Containers
var Timesheet = require('./timesheet');
var MobileTimesheet = require('./mobileTimesheet/m-timesheet');

var Container = React.createClass({
    displayName: "Container",
    getInitialState: function(){
        return ({
            viewWidth: window.innerWidth,
            queue: false
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
            this.setState({queue: true});
        }
    },
    setContainer: function(size){
        return (size > 1000? <Timesheet userID={this.props.params.userID} {...this.props}/>: <MobileTimesheet {...this.props}/>);
    },
    componentDidMount: function(){
        window.addEventListener("resize", this.updateViewWidth);
    },
    componentWillUnmount: function(){
        window.removeEventListener("resize", this.updateViewWidth);
    },
    render:function(){
        return  (
            <div>
                {this.setContainer(this.state.viewWidth)}
            </div>
        );
    }
});

module.exports = Container;
