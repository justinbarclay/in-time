var authActions = require("../actions/authActions.js");

function authStaff(nextState, replace) {
    if (!auth.loggedIn()) {
        replace({
            pathname: '/login',
            state: {
                nextPathname: nextState.location.pathname
            }
        });
    }
}

function authSup(nextState, replace) {
    if (!auth.loggedIn()) {
        replace({
            pathname: '/login',
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
