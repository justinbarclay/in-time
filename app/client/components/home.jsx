// React
var React = require("react");

//Components
var TSHeader = require("./TSHeader");
var Signin = require("./SignInForm");
var Signup = require("./SignUpForm");
var TSFooter = require("./TSFooter");

// Router
var Router = require("react-router");
var RouteHandler = Router.RouteHandler;

// Component
var Home = React.createClass({
  displayName: "Home",
  propTypes: {},
  mixins: [],

  getInitialState: function () { return null; },

  componentWillMount: function () {},

  componentWillUnmount: function () {},

  render: function () {
    return (
      <div className="home">
        <Signin />
        <Signup />
      </div>
    );
  }
});

module.exports = Home;
