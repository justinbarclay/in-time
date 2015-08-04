var React = require("react");

var About = React.createClass({
    displayName: "About",
    mixins: [],
    propTypes: [],
    componentDidMount: function(){
        var AJAXreq = new XMLHttpRequest();
        AJAXreq.open("post", "/JWT", true);
        AJAXreq.setRequestHeader('ContentType',
            'application/json; charset=UTF8');
        AJAXreq.send(localStorage.getItem('JWT'));
        AJAXreq.onreadystatechange = function() {
            console.log("state change"); //turn server response into JSON

            var res = JSON.stringify(AJAXreq.responseText);
            console.log(res);
            if (AJAXreq.readyState === 4) {
                //more debugging stuff
                console.log(AJAXreq.readyState);
                console.log(res);
            } else {
                //Debugging stuff
                console.log(AJAXreq.readyState);
                console.log(res);
            }
        };
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
