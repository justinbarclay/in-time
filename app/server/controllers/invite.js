var sendgrid = require("sendgrid")('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');
var userInvite = require("./user").invite;
var domain = require("../../../config.js").domain;

var invite = function(owner, email, role, code, callback){
    var success;
    userInvite({owner: owner, email:email, role:role, code: code}, function(data){
        console.log(data);
        console.log(data.message);
        if(!data.err){
            sendgrid.send({
                to:       email,
                from:     'admin@timescape.tech',
                subject:  'You have been invited to Timescape, helping you escape the hassle of tracking time',
                    html:     customlink(domain, code)
            }, function(err, json) {
                if (err) {
                    console.log(err);
                    console.error(err);
                    var failMessage = `${email} could not be invited at this time, please ensure you have the right e-mail or try again later`;
                    sucess = false;
                    callback(err, {message: failMessage, success: success});
                } else {
                    console.log(json);
                    succMessage = `An invite was successfully sent to ${email}`;
                    success = true;
                    return callback(err, {message: succMessage, success: success});
                }
          });
        } else{
          var failMessage = `${email} has already been invited. An invitation code has not been sent to ${email}.`;
          return callback(data.err, {message: failMessage, success: false});
        }
    });
};


module.exports = invite;

function customlink(domain, code){

    var link = domain+"/#/signup/"+code;
    var message = `You have been <a href=${link}>invited</a> to use Timescape! <br/> Come join the tens of us. Make your life easier by being able to track your activities quickly and easily, anywhere where you have an electronic device connected to the internet!`;
    return message;
}
