var config = require('./config');
var client = require('twilio')(config.accountSid, config.authToken);
module.exports.sendSms = function(phoneNumber, TimeStatus) { 
    client.messages.create({ 
        to      :   phoneNumber,
        from    :   config.sendingNumber, 
        body    :   TimeStatus, 
    }, function(err, message) {
         if (!err) {
            res.end("Message was send successfully.");
        } else {
            res.end("There was erorr sending a sms. Please try again later.");
        }
    });
};