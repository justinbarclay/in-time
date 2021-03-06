var Flux = require("../biff");
var messageActions = require("./messageActions");
//var authStore = require('../stores/authStore');
var authActions = require("./authActions");

// Set of allowed actions
var adminActions = Flux.createActions({
    invite: function(user) {
        self = this;
        user.id = authActions.getUserInfo().id;
        var AJAXreq = new XMLHttpRequest();
        AJAXreq.open("post", "/api/invite", true);
        AJAXreq.setRequestHeader('ContentType',
            'application/json; charset=UTF8');
        var currentJWT = localStorage.getItem('JWT');
        AJAXreq.setRequestHeader('X-ACCESS-TOKEN', currentJWT);
        AJAXreq.send(JSON.stringify(user));
        AJAXreq.onreadystatechange = function() {
            if (AJAXreq.readyState === 4) {
                var data = JSON.parse(AJAXreq.responseText);
                var auth = AJAXreq.getResponseHeader("X-ACCESS-TOKEN");
                authActions.setJWT(auth);
                if(data.message){
                    messageActions.addMessage("owner", data.message, data.success);
                }
            }
        };
    }
});
module.exports = adminActions;
