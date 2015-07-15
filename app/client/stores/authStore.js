// This store will give the user the ability to log in and out of the system. It will expect a
// Username, email, and JWT token to start and I might add in UserID number as well

// Flux implementation
var Flux = require('../biff');

// initialize the store
// this is a simpe object, because I only want to store one authenticated user at a time
var _user = {};

var authStore = Flux.createStore({
    getUserInfo: function() {
        return _user;
    },

    signinUser: function(user) {
        // this will take a user object with the properties of username, email and JWT token
        // I may eventually grow this information to first name, last name, and other user information
        _user.username = user.username;
        _user.email = user.email;
        _user.token = user.token;
        console.log("_user: " + JSON.stringify(_user));
        console.log("user: " + JSON.stringify(_user));

    },
    logoutUser: function() {
        _user = {};
    },
    updateUser: function(user) {
        // functionally the same thing as signinUser, but different names to indicate different purposes.
        _user.username = user.username;
        _user.email = user.email;
        _user.token = user.token;
    },
}, function(payload) {
    if (payload.actionType === "SIGNIN_USER") {
        this.signinUser(payload.user);
        this.emitChange();
    }
    if (payload.actionType === "LOGOUT_USER") {
        this.logoutUser();
        this.emitChange();
    }
    if (payload.actionType === "CHANGE_USER") {
        this.updateUser(payload.user);
        this.emitChange();
    }
});

module.exports = authStore;
