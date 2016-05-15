var authStore = require('../stores/authStore');
var timesheetStore = require('../stores/timesheetStore');
var messageActions = require('./messageActions');
var Flux = require("../biff");


// Set of allowed actions
var authActions = Flux.createActions({
    getUserInfo: function() {
        return authStore.getUserInfo();
    },
    signIn: function(user) {
        self = this;
        var AJAXreq = new XMLHttpRequest();
        AJAXreq.open("post", "/api/signin", true);
        AJAXreq.setRequestHeader('ContentType',
            'application/json; charset=UTF8');
        AJAXreq.send(JSON.stringify(user));
        AJAXreq.onreadystatechange = function() {
            if (AJAXreq.readyState === 4) {
                var user = JSON.parse(AJAXreq.responseText);
                if (user.success) {
                    authActions.setJWT(AJAXreq.getResponseHeader("X-ACCESS-TOKEN"));
                }
                messageActions.addMessage("signin", user.message);
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
        this.dispatch({
            actionType: "DELETE_TIMESHEETS"
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
        if(jwt === "null"){
            authActions.signOut();
        } else{
            this.dispatch({
                actionType: "SET_JWT",
                JWT: jwt
            });
        }
    },
    verifyJWT: function(jwt){
        self = this;
        var AJAXreq = new XMLHttpRequest();
        AJAXreq.open("post", "/api/JWT", true);
        AJAXreq.setRequestHeader('ContentType',
            'application/json; charset=UTF8');
        AJAXreq.setRequestHeader('X-ACCESS-TOKEN', authActions.getJWT());
        AJAXreq.send();
        AJAXreq.onreadystatechange = function() {
            if (AJAXreq.readyState === 4) {
                var user = JSON.parse(AJAXreq.responseText);
                authActions.setJWT(AJAXreq.getResponseHeader("X-ACCESS-TOKEN"));
                console.log("user "+ JSON.stringify(user));
                self.dispatch({
                    actionType: "SIGNIN_USER",
                    user: user
                });
            }
        };
    },
    changeRole: function(role){
        this.dispatch({
            actionType: "CHANGE_ROLE",
            role: role
        });
    }
});

module.exports = authActions;
