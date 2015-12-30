var Flux = require('../biff');

// initialize the store
// this is a simpe object, because I only want to store one authenticated user at a time
var _staff = [
    {name:"Josh", hours:31},
    {name:"Sally", hours:36.5},
    {name:"Emily", hours:40},
    {name:"Tim", hours:15 }
    ];

var staffStore = Flux.createStore({
    getStaff: function(){
        return _staff;
    }
});

module.exports = staffStore;
