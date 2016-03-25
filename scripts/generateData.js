var uuid = require("node-uuid");
var service = [
    "Pick up", "Administrative", "Timesheets", "Critical Incidence",
    "Phone Call", "Case Consult"
];
var time = [
    0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3, 3.25, 3.5,
    3.75, 4, 4.25, 4.5, 4.75, 5, 5.25, 5.5, 5.75, 6, 6.25, 6.5, 6.75, 7,
    7.25, 7.5, 7.75, 8, 8.25, 8.5, 8.75, 9, 9.25, 9.5, 9.75, 10, 10.25,
    10.5, 10.75, 11, 11.25, 11.5, 11.75, 12, 12.25, 12.5, 12.75, 13
];

randomInt = function(max) {
    return Math.floor(Math.random() * max);
};

randomDate = function(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() -
        start.getTime()));
};

generateTimesheet = function() {
    var start = randomDate(new Date(2015, 01, 01), new Date());
    var end = new Date(start.getTime() + 1209600*1000);
    return {
        timesheetID: uuid.v4(),
        engagement: generateEngagement(),
        startDate: buildYearMonthDay(start),
        endDate: buildYearMonthDay(end),
        entries: generateEntries(start, end)
    };
};

generateEntries = function(start, end){
    entries = [];
    while(entries.length < randomInt(10)+1){
        entries.push(generateRow(start, end));
    }
    return entries;
};

generateEngagement = function(){
        return "" + randomInt(9) + randomInt(9) + randomInt(9) + randomInt(9) + randomInt(9) + randomInt(9);
};

generateRow = function(start, end) {
    return ({
        rowID: uuid.v4(),
        service: service[randomInt(service.length)],
        duration: time[randomInt(time.length)],
        date: buildYearMonthDay(randomDate(start, end)),
        delete: false
    });
};

generateTimesheets = function(num){
    var timesheets = [];
    while(timesheets.length < num){
        timesheets.push(generateTimesheet());
    }
    return timesheets;
};

function buildYearMonthDay(date) {
    var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    var month = date.getMonth()+1 < 10 ? '0' + (date.getMonth()+1) : date.getMonth()+1;
    var year = date.getFullYear();
    return (year + "-" + month + "-" + day);
}
 module.exports = generateTimesheets;
