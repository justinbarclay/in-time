var React = require('react');

var Logo = React.createClass({
    displayName: "Logo",
    render: function(){
        return (
            <div className="container">
                <div className="border">
                    <div className="clock">
                        <div className="minute-hand"></div>
                        <div className="pivot-point"></div>
                        <div className="hour-hand"></div>
                    </div>
                </div>
                <div className="organization">
                    <h1>Timescape</h1>
                    <p> Helping you escape the hassle of tracking time</p>
                </div>
            </div>
        );
    }
});

module.exports = Logo;
