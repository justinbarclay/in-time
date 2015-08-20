var expect = require('chai').expect;
var should = require('chai').should;
var myApp = 'localhost:8888';
var request = require('supertest')(myApp);
var querystring = require('querystring');


/*function hasPreviousAndNextKeys(res) {
    if (!('next' in res.body)) return "missing next key";
    if (!('prev' in res.body)) throw new Error("missing prev key");
    console.log(res.body);
}*/

describe('Testing the login page', function(){
    it('should provide a 404 response', function (done) {
        request.get('/loginz').expect(404).end(function(err, res){
            done();
        });
    });
    it('should provide a GET response of 200', function(done){
      request.get('/').expect(200).end(function(err, res){
        console.log(res.text);
        done();
      });
    });
  });

describe('some second test', function(){
    it('should have a body', function(done){
      request.get('/test').expect(function(res){
        if(!('test' in res.body)) console.log(res.body);
      }).end(done);
    });

});

describe('Testing the user api', function (){
  it("should return false for a user that doesn/'t exist"), function(done){
    request.body();
    done();
  }
});


////////////////////////////////////////////////////////////////////////////////
//
//TIMESHEET TESTS
//
////////////////////////////////////////////////////////////////////////////////
// //Running some tests
// //these tests should be moved to mocha as soon as possible
function generateMetaData(id) {
    return {
        "timesheetID": uuid(),
        "userID": 1,
        "start_date": "2015/01/01",
        "end_date": "2015/01/15",
        "engagement": Math.floor(Math.random() * 10000)
    };
}

function generateEntry(id) {
    return {
        "timesheet_foreignkey": id,
        "service_duration": (Math.floor(Math.random() * 12)),
        "service_description": "description of service",
        "service_date": "05/07/2015"
    };

}

function generateTimesheet(numberOfEntries) {
    var timesheet = generateMetaData();
    var entries = [];
    var rows = numberOfEntries ? numberOfEntries : Math.floor(Math.random() * 7 +
        3);
    for (let i = 0; rows > i; i++) {
        entries.push(generateEntry(timesheet.timesheetID));
    }
    timesheet.entries = entries;
    return timesheet;
}

// let time = generateTimesheet();
// createTimesheet(time);
// let timesheet = function() {
//     let timethingy = {};
//     return {
//         set: function(obj) {
//             timethingy = obj;
//         },
//         get: function() {
//             return timethingy;
//         }
//     };
// };
//
// getTimesheets({
//     "userID": 1
// });



// let queryString = "SELECT timesheets_meta.timesheet_id, timesheets_meta.user_foreignkey, timesheets_meta.start_date, timesheets_meta.end_date, timesheets_meta.engagement, timesheets.service_description, timesheets.service_duration, timesheets.service_date FROM employees.public.timesheets_meta, employees.public.timesheets WHERE timesheets_meta.timesheet_id = timesheets.timesheet_foreignkey AND timesheets_meta.timesheet_id = $1";
// deleteTimesheets({"delete": ['c54f5c44-247b-452e-8c0c-d5ef3d3ed356']}, null, function(data){console.log(data)});
// let myTimesheet = timesheet();
// //     myTimesheet.setTimethingy(10);
//     console.log(myTimesheet.getTimethingy());
// connect({"userID": 1}).then(getTimesheetIDs).then(function(data){
//     myTimesheet.set(data)
//     return data;
// }).catch(error).then(finish);
// console.log("generateMetaData");
// console.log(generateMetaData());
// console.log("generateEntry");
// console.log(generateEntry(1));
// console.log("Generate Timesheet");
// console.log(generateTimesheet());
