var React = require("react");

var authActions = require('../actions/authActions');

var About = React.createClass({
    displayName: "About",
    mixins: [],
    propTypes: [],
    componentDidMount: function(){
        user = JSON.stringify({userID: 1});
        var AJAXreq = new XMLHttpRequest();
        AJAXreq.open("POST", "/timesheets", true);
        AJAXreq.setRequestHeader('ContentType',
            'application/json; charset=UTF8');
        currentJWT = localStorage.getItem('JWT');
        AJAXreq.setRequestHeader('X-ACCESS-TOKEN', currentJWT);
        AJAXreq.setRequestHeader('ContentType',
            'application/json; charset=UTF8');

        AJAXreq.send(user);
        AJAXreq.onreadystatechange = function() {
            console.log("state change"); //turn server response into JSON

            var res = JSON.stringify(AJAXreq.responseText);
            console.log(res);
            if (AJAXreq.readyState === 4) {
                newJWT = AJAXreq.getResponseHeader("X-ACCESS-TOKEN");
                console.log(newJWT);
                if (newJWT){
                    localStorage.setItem('JWT', newJWT);
                } else {
                    console.log("Made it into about");
                    console.log("Signout");
                    // authActions.signOut();
                }
                console.log(AJAXreq.readyState);
                console.log(JSON.parse(res));
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
