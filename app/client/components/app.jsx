var React = require("react");
var authActions = require("../actions/authActions");
//var Router = require("react-router");
//var RouteHandler = Router.RouteHandler;

//Components
var Header = require("./Header");
var Footer = require("./footer");

var app = React.createClass({
    displayName: "TimeClock App",
    mixins:[],
    propTypes:[],
    componentWillMount: function(){
        var jwt = authActions.getJWT();
        if(jwt){
            authActions.verifyJWT(jwt);
        }
    },
    render: function(){
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
