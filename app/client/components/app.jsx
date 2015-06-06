var React = require("react");
var Router = require("react-router");
var RouteHandler = Router.RouteHandler;

//Components
var TSHeader = require("./TSHeader");
var TSFooter = require("./TSFooter");

var app = React.createClass({
    displayName: "TimeClock App",
    mixins:[],
    propTypes:[],

    render: function(){
        return (
            <div className="main">
                <TSHeader />
                <RouteHandler />
                <TSFooter />

            </div>
        );
    }
});

module.exports = app;
