var sendgrid = require("sendgrid")('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');

var invite = function(email, code){
    sendgrid.send({
        to:       email,
        from:     'admin@in-time.com',
        subject:  'You have been invited to In Time, the best timesheet management program',
            text:     customlink(code)
    }, function(err, json) {
        if (err) {
            console.error(err);
            return false;
        } else {
            console.log(json);
            return true;
        }
  });
};


module.exports = invite;

function customlink(code){
    return "127.0.0.1:8888/signup/"+code;
}
