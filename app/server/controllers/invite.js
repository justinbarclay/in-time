var sendgrid = require("sendgrid")('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');
var userInvite = require("./user").invite;
var domain = require("../../../config").domain;

var invite = function(owner, email, role, code, callback){
    userInvite(owner, email, role, code, function(err, message){
        console.log(err);
        console.log(message);
        if(!err){
            sendgrid.send({
                to:       email,
                from:     'admin@timescape.tech',
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
          return callback(err, "User has all ready been invited, we have not sent an invite code to the user");
        }
    });
};


module.exports = invite;

function customlink(code){
    return domain+"/#/signup/"+code;
}
