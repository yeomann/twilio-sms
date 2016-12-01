var config = require('./config');
var twilio = require('twilio');
var client = new twilio.RestClient(config.accountSid, config.authToken);

sendSms = function(phoneNumber, message) {

	var promise = client.messages.create({ 
	    to      :   phoneNumber,
	    from    :   config.sendingNumber, 
	    body    :   message, 
	});

	promise.then(function() {
	    return "Message was send successfully.";
	}, function(erorr) {
	    return "There was erorr sending a sms. Please try again later.";
	});

	return promise;
}

module.exports = sendSms;