var React = require("react");
var Router = require("react-router");
var RouteHandler = Router.RouteHandler;

//Components
var Header = require("./Header");
var Footer = require("./Footer");

var app = React.createClass({
    displayName: "TimeClock App",
    mixins:[],
    propTypes:[],

    render: function(){
        return (
            <div className="app">
                <Header />
                <main>
                    <RouteHandler />
                </main>
                <Footer />
            </div>
        );
    }
});

module.exports = app;
