var sendgrid = require("sendgrid")('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');
var userInvite = require("./user").invite;

var invite = function(owner, email, role, code, callback){
    userInvite(owner, email, role, code, function(err, message){
        console.log(err);
        console.log(message);
        if(!err){
            sendgrid.send({
                to:       email,
                from:     'admin@in-time.com',
                subject:  'You have been invited to In Time, the best timesheet management program',
                    text:     customlink(code)
            }, function(err, json) {
                if (err) {
                    console.log(err);
                    console.error(err);
                    failMessage = data.email + " could not be invited at this time, please ensure you have the right e-mail or try again later";
                    callback(err, failMessage);
                } else {
                    console.log(json);
                    succMessage = "An invite was successfully sent to " + data.email;
                    return callback(err, succMessage);
                }
          });
        } else{
          return callback(err, message);
        }
    });
};


module.exports = invite;

function customlink(code){
    return "127.0.0.1:8888/#/signup/"+code;
}
