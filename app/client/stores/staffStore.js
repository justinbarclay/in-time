var Flux = require('../biff');

// initialize the store
// this is a simpe object, because I only want to store one authenticated user at a time
var _staff = [];

var staffStore = Flux.createStore({
    getAllStaff: function() {
        return _staff;
    },
    getStaff: function(name){
        return findStaff(name);
    },
    setStaff: function(staff) {
        _staff = staff;
    }
},
    function(payload) {
        if (payload.actionType === "SET_STAFF") {
            this.setStaff(payload.data);
            this.emitChange();
        }
        if (payload.actionType === "OTHER") {
            this.emitChange();
        }
});


findStaff = function(name){
    for(i = 0; i < _staff.length; i++){
        if(_staff[i].name === name){
            return _staff[i];
        }
    }
};
module.exports = staffStore;
