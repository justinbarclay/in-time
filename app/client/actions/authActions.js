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
            console.log("state change"); //turn server response into JSON

            var res = JSON.parse(AJAXreq.responseText);
            console.log(res);
            if (AJAXreq.readyState === 4) {
                //more debugging stuff
                console.log(AJAXreq.readyState);
                console.log(res.message);
                user.success = res.success;
                if (user.success) {
                    user.token = res.JWT;
                } else {
                    user.message = res.message;
                    user.success = res.success;
                }
                console.log("user: " + JSON.stringify(user));
                self.dispatch({
                    actionType: "SIGNIN_USER",
                    user: user
                });
            } else {
                //Debugging stuff
                console.log(AJAXreq.readyState);
                console.log(res.message);
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
