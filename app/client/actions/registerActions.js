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
        this.dispatch({
            actionType: "UPDATE_ORG",
            entry: entry
        });
    },
    signUpUser: function(user){
        // takes in a user object {emai:'', password:''} and sends it off to the
        // server to  sign the user up and, if successfull, log the user in to
        // the service
        var self = this;
        var AJAXreq = new XMLHttpRequest();
        AJAXreq.open("post", "/api/signup", true);
        AJAXreq.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        AJAXreq.send(user);
        AJAXreq.onreadystatechange = function () {
            if (AJAXreq.readyState === 4)   {
                var signup = JSON.parse(AJAXreq.responseText);
                authActions.setJWT(AJAXreq.getResponseHeader("X-ACCESS-TOKEN"));
                messageActions.addMessage("signup", signup.message);
                self.dispatch({
                    actionType: "SIGNIN_USER",
                    user: signup
                });
            }
        };
    }, signUpOrg: function(org){
        //take in an organization object {org:{name:'',
        //phone:'', domain:''}, owner: {email:'', password:''}} sends it off to
        // the server to register the organization and ownerand, if successfull,
        // log the owner in the service
        var self = this;
        org = JSON.stringify(org);
        var AJAXreq = new XMLHttpRequest();
        AJAXreq.open("post", "/api/register", true);
        AJAXreq.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        AJAXreq.send(org);
        AJAXreq.onreadystatechange = function () {
            if (AJAXreq.readyState === 4)   {
                authActions.setJWT(AJAXreq.getResponseHeader("X-ACCESS-TOKEN"));
                register = JSON.parse(AJAXreq.responseText);
                messageActions.addMessage("regorg", register.message);
                self.dispatch({
                    actionType: "SIGNIN_USER",
                    user: register
                });
            }
        };
    }
});

module.exports = registerActions;
