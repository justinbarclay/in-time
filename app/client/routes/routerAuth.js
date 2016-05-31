var authActions = require("../actions/authActions.js");
var authStore = require("../stores/authStore.js");
function authStaff(nextState, replace) {
    if (!authStore.authenticated()) {
        replace({
            pathname: '/signin',
            state: {
                nextPathname: nextState.location.pathname
            }
        });
    }
}

function authSup(nextState, replace) {
    if (!authStore.authenticated()) {
        replace({
            pathname: '/signin'
        });
    } else if (!matchAuth(authActions.getUserInfo().role, ["Supervisor", "Owner"])){
        replace({
            pathname: '/timesheets'
        });
    } else {
        return;
    }
}
module.exports.sup = authSup;
module.exports.staff = authStaff;

function matchAuth(user, authedTypes) {
        for (i = 0; i < authedTypes.length; i++) {
            if (authedTypes[i] === user) {
                return true;
            }
        }
        return false;
    }
