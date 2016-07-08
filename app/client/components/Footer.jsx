//React
var React = require('react');


var Footer = React.createClass({
    displayName: "Footer",
    propTypes: [],
    mixins: [],

    render: function(){
        return (
            <div className="footer">
                <p className="copyright">Copyright 2015 New Plagiarist Media</p>
            </div>
        );
    }

});

module.exports = Footer;
