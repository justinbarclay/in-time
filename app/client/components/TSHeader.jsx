//React
var React = require("react");
var Router = require("react-router");
var Link = Router.Link;

var TSHeader = React.createClass({
    displayName: "TS Header",
    propTypes: [],
    mixins: [],

    render: function(){
        return (
            <div className="TSHeader">
                <div className="navigation">
                    <Link to="home" className="nav"><label>Home</label></Link>
                    <Link to="about" className="nav"><label>About</label></Link>
                    <Link to="signin" className="nav"><label>Sign in</label></Link>
                    <Link to="signup" className="nav"><label>Sign up</label></Link>
                </div>
            </div>
        );
    }

});

module.exports = TSHeader;
