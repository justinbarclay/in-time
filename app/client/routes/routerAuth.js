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
            pathname: '/signin',
            state: {
                nextPathname: nextState.location.pathname
            }
        });
    } else if (!matchAuth(authActions.getUserInfo.role, ["Supervisor", "Admin"])){
        replace({
            pathname: '/timesheets',
            state: {
                nextPathname: nextState.location.pathname
            }
        });
    }
}
module.exports.sup = authSup;
module.exports.staff = authStaff;

function matchAuth(user, authedTypes) {
        for (i = 0; i < authedTypes.length; i++) {
            if (authedTypes[i] === user) {
                return true;
            } else {
                return false;
            }
        }
    }
