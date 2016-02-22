var React = require("react");
//var Router = require("react-router");
//var RouteHandler = Router.RouteHandler;

//Components
var Header = require("./Header");
var Footer = require("./footer");

var app = React.createClass({
    displayName: "TimeClock App",
    mixins:[],
    propTypes:[],

    render: function(){
        console.log(this.conext);
        return (
            <div className="app">
                <Header />
                <main>
                    {this.props.children}
                </main>
                <Footer />
            </div>
        );
    }
});

module.exports = app;
