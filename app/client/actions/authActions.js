var authStore = require('../stores/authStore');

var Flux = require("../biff");

// Set of allowed actions
var authActions = Flux.createActions({
    // getUserInfo: function() {
    //     this.dispatch({
    //         user: authStore.getUser()
    //     });
    // },

    signIn: function(user) {
        this.dispatch({
            actionType: "SIGNIN_USER",
            user: user
        });
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
    }
});

module.exports = authActions;
