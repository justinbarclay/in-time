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
        AJAXreq.open("put", "/api/signin", true);
        AJAXreq.setRequestHeader('ContentType',
            'application/json; charset=UTF8');
        AJAXreq.send(JSON.stringify(user));
        AJAXreq.onreadystatechange = function() {
            if (AJAXreq.readyState === 4) {
                var user = JSON.parse(AJAXreq.responseText);
                if (user.success) {
                    authActions.setJWT(AJAXreq.getResponseHeader("X-ACCESS-TOKEN"));
                    localStorage.setItem('USER_ID', user.id);
                }
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
    isLoggedIn: function() {
        return authStore.authenticated();
    },
    getJWT: function(){
        return localStorage.getItem('JWT');
    },
    setJWT: function(jwt) {
        jwt = jwt !== "null" ? jwt : null;
        if(jwt){
            return localStorage.setItem('JWT', jwt);
        } else {
            this.dispatch({
                actionType: "SIGNOUT_USER"
            });
        }
    },
    changeRole: function(role){
        this.dispatch({
            actionType: "CHANGE_ROLE",
            role: role
        });
    }
});

module.exports = authActions;
