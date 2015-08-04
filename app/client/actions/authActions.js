var authStore = require('../stores/authStore');

var Flux = require("../biff");


// Set of allowed actions
var authActions = Flux.createActions({
    getUserInfo: function() {
        return authStore.getUserInfo();
    },
    signIn: function(user) {
        self = this;
        var AJAXreq = new XMLHttpRequest();
        AJAXreq.open("post", "/signin", true);
        AJAXreq.setRequestHeader('ContentType',
            'application/json; charset=UTF8');
        AJAXreq.send(JSON.stringify(user));
        AJAXreq.onreadystatechange = function() {
            if (AJAXreq.readyState === 4) {
                //more debugging stuff
                var res = JSON.parse(AJAXreq.responseText);
                console.log(res);
                user = res;
                if (user.success) {
                    localStorage.setItem('JWT', AJAXreq.getResponseHeader("X-ACCESS-TOKEN"));
                    localStorage.setItem('USER_ID', user.id);
                }
                console.log("user: " + JSON.stringify(user));
                self.dispatch({
                    actionType: "SIGNIN_USER",
                    user: user
                });
            }
        };

    },
    signOut: function() {
        this.dispatch({
            actionType: "SIGNOUT_USER"
        });
    },
    changeUserInfo: function(user) {
        this.dispatch({
            actionType: "CHANGE_USER",
            user: user
        });
    },
    authenticated: function() {
        return authStore.authenticated();
    }
});


module.exports = authActions;
