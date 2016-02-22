var authActions = require("../actions/authActions.js");
var authStore = require("../stores/authStore.js");
function authStaff(nextState, replace) {
    if (!authStore.authenticated()) {
        console.log("test");
        replace({
            pathname: '/signin',
            state: {
                nextPathname: nextState.location.pathname
            }
        });
    }
}

function authSup(nextState, replace) {
    console.log(nextState);
    if (!authStore.authenticated()) {
        replace({
            pathname: '/signin'
        });
    } else if (!matchAuth(authActions.getUserInfo.role, ["Supervisor", "Admin"])){
        console.log(authActions.getUserInfo);
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
            } else {
                return false;
            }
        }
    }
