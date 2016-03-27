var Flux = require("../biff");
var messageActions = require("./messageActions");
var authActions = require('../actions/authActions');

// Set of allowed actions
var adminActions = Flux.createActions({
    invite: function(user) {
        var id = authActions.getUserInfo().id;
        self = this;
        data = {email: user, id: id};
        var AJAXreq = new XMLHttpRequest();
        AJAXreq.open("post", "/api/invite", true);
        AJAXreq.setRequestHeader('ContentType',
            'application/json; charset=UTF8');
        AJAXreq.send(JSON.stringify(data));
        AJAXreq.onreadystatechange = function() {
            if (AJAXreq.readyState === 4) {
                var data = JSON.parse(AJAXreq.responseText);
                console.log(data);
                if(data.message){
                    console.log("test");
                    messageActions.addMessage("owner", data.message);
                }
                if (data.success) {
                    authActions.setJWT(AJAXreq.getResponseHeader("X-ACCESS-TOKEN"));
                    //localStorage.setItem('USER_ID', user.id);
                }
            }
        };
    }
});
module.exports = adminActions;
