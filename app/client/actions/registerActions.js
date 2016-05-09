var registerStore = require('../stores/registerStore');
var authActions = require('./authActions');
var messageActions = require('./messageActions');

var Flux = require("../biff");

// Set of allowed actions
var registerActions = Flux.createActions({
    getInfo: function(){
        return registerStore.getInfo();
    },
    updateEntry: function(entry){
        console.log("Entry: ", entry);
        this.dispatch({
            actionType: "UPDATE_ORG",
            entry: entry
        });
    },
    signUpUser: function(user){
        var self = this;
        var AJAXreq = new XMLHttpRequest();
        AJAXreq.open("post", "/api/signup", true);
        AJAXreq.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        AJAXreq.send(user);
        AJAXreq.onreadystatechange = function () {
            if (AJAXreq.readyState === 4)   {
                var signup = JSON.parse(AJAXreq.responseText);
                if (signup.success) {
                    authActions.setJWT(AJAXreq.getResponseHeader("X-ACCESS-TOKEN"));
                }
                messageActions.addMessage("signup", signup.message);
                self.dispatch({
                    actionType: "SIGNIN_USER",
                    user: signup
                });
            }
        };
    }
});

module.exports = registerActions;
