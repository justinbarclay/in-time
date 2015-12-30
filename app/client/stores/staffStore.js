var Flux = require('../biff');

// initialize the store
// this is a simpe object, because I only want to store one authenticated user at a time
var _staff = [
    {name:"Josh Brolin", hours:31},
    {name:"Sally Sarandon", hours:36.5},
    {name:"Emily Buffington", hours:40},
    {name:"Tim Russel", hours:15 }
    ];

var staffStore = Flux.createStore({
    getStaff: function(){
        return _staff;
    }
});

module.exports = staffStore;
