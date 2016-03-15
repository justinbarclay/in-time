var Flux = require("../biff");


// Set of allowed actions
var adminActions = Flux.createActions({
    invite: function(user) {
        self = this;
        var AJAXreq = new XMLHttpRequest();
        AJAXreq.open("post", "/invite", true);
        AJAXreq.setRequestHeader('ContentType',
            'application/json; charset=UTF8');
        AJAXreq.send(JSON.stringify(user));
        AJAXreq.onreadystatechange = function() {
            if (AJAXreq.readyState === 4) {
                var res = JSON.parse(AJAXreq.responseText);
                user = res;
                console.log(user);
                if (user.success) {
                    authActions.setJWT(AJAXreq.getResponseHeader("X-ACCESS-TOKEN"));
                    localStorage.setItem('USER_ID', user.id);
                }
            }
        };
    }
});

module.exports = adminActions;
