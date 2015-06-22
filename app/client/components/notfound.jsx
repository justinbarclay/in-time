
var React = require('react');

var NotFound = React.createClass({
    displayName: "NotFound",
    propTypes: [],
    mixins: [],

    render: function(){
        return (
            <div className="notfound">
                <h1>404 Page Not Found</h1>
            </div>
        );
    }
});

module.exports = NotFound;
