var Flux = require("../biff");
var messageActions = require("./messageActions");
var authActions = require('./authActions');

// Set of allowed actions
var adminActions = Flux.createActions({
    invite: function(user) {
        var id = authActions.getUserInfo().id;
        self = this;
        user.id = id;
        var AJAXreq = new XMLHttpRequest();
        AJAXreq.open("post", "/api/invite", true);
        AJAXreq.setRequestHeader('ContentType',
            'application/json; charset=UTF8');
        AJAXreq.send(JSON.stringify(user));
        console.log(user);
        AJAXreq.onreadystatechange = function() {
            if (AJAXreq.readyState === 4) {
                var data = JSON.parse(AJAXreq.responseText);
                console.log(data);
                setJWT(AJAXreq.getResponseHeader("X-ACCESS-TOKEN"));
                if(data.message){
                    console.log("test");
                    messageActions.addMessage("owner", data.message);
                }
                // if (data.success) {
                //     authActions.setJWT(AJAXreq.getResponseHeader("X-ACCESS-TOKEN"));
                // }
            }
        };
    },
    setJWT(header){
        jwt = jwt !== "null" ? jwt : null;
        if(jwt){
            return localStorage.setItem('JWT', jwt);
        } else {
            this.dispatch({
                actionType: "SIGNOUT_USER"
            });
        }
    }
});
module.exports = adminActions;

function setJWT(header){
    authActions.setJWT(header);
}
