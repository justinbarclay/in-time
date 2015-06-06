//React
var React = require("react");


var TSHeader = React.createClass({
    displayName: "TS Header",
    propTypes: [],
    mixins: [],

    render: function(){
        return (
            <div class="header">
                <button class="nav">Home</button>
                <button class="nav">About</button>
                <button class="nav">Sign in</button>
                <button class="nav">Sign up</button>
            </div>
        );
    }

});

module.exports = TSHeader;
