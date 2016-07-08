var React = require('react');

var authActions = require('../actions/authActions');

var About = React.createClass({
    displayName: "About",
    mixins: [],
    propTypes: [],
    componentDidMount: function(){
    },
    render: function() {
        return (
            <div className="about">
                <p>Mountain View Industries is an industry leader in Business Systems. We take pride in our work and love to help successful businesses grow. We use our expertise that we have built up over the past 30 years to help Fortune 5000 businesses innovate and become market leaders.</p>
            </div>
        );
    }
});

module.exports = About;
