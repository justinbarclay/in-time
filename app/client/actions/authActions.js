var authStore = require('../stores/authStore');

var Flux = require("../biff");

// Set of allowed actions
var authActions = Flux.createActions({
    getUserInfo: function() {
        this.dispatch({
            recipes: authStore.getUser()
        });
    },

    signinUser: function(user) {
        this.dispatch({
            actionType: "SIGNIN_USER",
            user: user
        });
    },
    logoutUser: function() {
        this.dispatch({
            actionType: "LOGOUT_USER"
        });
    },
    changeUserInfo: function(user) {
        this.dispatch({
            actionType: "SIGNOUT_USER",
            user: user
        });
    }
});

module.exports = authActions;
