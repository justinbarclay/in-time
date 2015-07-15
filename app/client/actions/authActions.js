var authStore = require('../stores/authStore');

var Flux = require("../biff");

// Set of allowed actions
var authActions = Flux.createActions({
    getUserInfo: function() {
        return {
            recipes: authStore.getUser()
        };
    },

    signinUser: function(user) {
        return {
            actionType: "SIGNIN_USER",
            user: user
        };
    },
    logoutUser: function() {
        return {
            actionType: "LOGOUT_USER"
        };
    },
    changeUserInfo: function(user) {
        return {
            actionType: "SIGNOUT_USER",
            user: user
        };
    }
});

module.exports = authActions;
