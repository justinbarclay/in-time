// This store will give the user the ability to log in and out of the system. It will expect a
// Username, email, and JWT token to start and I might add in UserID number as well

// Flux implementation
var Flux = require('../biff');

// initialize the store
// this is a simple object, because I only want to store one authenticated user at a time
var _user = {role:"Supervisor"};

var authStore = Flux.createStore({
    getUserInfo: function() {
        return _user;
    },
    authenticated: function(){
        var userID = parseInt(localStorage.getItem("USER_ID"));
        if (!_user.authenticated && userID){
            _user.id = userID;
            return true;
        }
        return _user.authenticated;
    },
    signinUser: function(user) {
        // this will take a user object with the properties of username, email and JWT token
        // I may eventually grow this information to first name, last name, and other user information
        _user.username = user.username;
        _user.id = user.id;
        _user.email = user.email;
        _user.authenticated = user.success;

        //Maybe split _user.message off to a message store
        _user.message = user.message;
    },
    signOut: function() {
        localStorage.removeItem('JWT');
        localStorage.removeItem('USER_ID');
        _user = {};
    },
    updateUser: function(user) {
        // functionally the same thing as signinUser, but different names to indicate different purposes.
        _user.username = user.username;
        _user.email = user.email;
    },
    changeRole: function(role){
        _user.role = role;
    },
    setJWT: function(jwt){
        jwt = jwt !== "null" ? jwt : null;
        localStorage.setItem('JWT', jwt);
    }
}, function(payload) {
    if (payload.actionType === "SIGNIN_USER") {
        this.signinUser(payload.user);
        this.emitChange();
    }
    if (payload.actionType === "SIGNOUT_USER") {
        this.signOut();
        this.emitChange();
    }
    if (payload.actionType === "CHANGE_USER") {
        this.updateUser(payload.user);
        this.emitChange();
    }
    if (payload.actionType === "CHANGE_ROLE"){
        this.changeRole(payload.role);
        this.emitChange();
    }
    if (payload.actionType === "SET_JWT"){
        this.setJWT(payload.JWT);
        this.emitChange();
    }
});

module.exports = authStore;
