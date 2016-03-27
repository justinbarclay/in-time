var sendgrid = require("sendgrid")('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');
var userInvite = require("./user").invite;

var invite = function(owner, email, role, code, callback){
    sendgrid.send({
        to:       email,
        from:     'admin@in-time.com',
        subject:  'You have been invited to In Time, the best timesheet management program',
            text:     customlink(code)
    }, function(err, json) {
        if (err) {
            console.log(err);
            console.error(err);
            callback(err, false);
        } else {
            console.log(json);
            userInvite(owner, email, role, code, function(err, res){
                console.log(err);
                console.log(res);
                return err ? callback(err, false): callback(err, true);
            });

        }
  });
};


module.exports = invite;

function customlink(code){
    return "127.0.0.1:8888/#/signup/"+code;
}
