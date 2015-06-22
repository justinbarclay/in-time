//React
var React = require("react");


var TSFooter = React.createClass({
    displayName: "TS Footer",
    propTypes: [],
    mixins: [],

    render: function(){
        return (
            <div className="TSFooter">
                <p className="copyright">Copyright 2015 New Plagiarist Media</p>
            </div>
        );
    }

});

module.exports = TSFooter;
