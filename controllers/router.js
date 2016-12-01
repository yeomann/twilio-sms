// lets map routes to controller
const express = require('express');
const router = express.Router();
const phone       =   require('phone');
// var config = require('../config');
// var client = require('twilio')(config.accountSid, config.authToken);
// var twilio = require('twilio')
// var client = new twilio.RestClient(config.accountSid, config.authToken);
const twilioClient = require('../twilioClient');
router.post('/api/sms-promotion', function(req, res) {
    let phoneNumber_array = phone(req.body.phone);
    let phoneNumber = phoneNumber_array[0];
    let TimeStatus = '';
    let datetime = new Date();
    if (datetime.getHours() < 12) {
        TimeStatus = "Good morning! Your promocode is AM123";
    } else {
        TimeStatus = "Hello! Your promocode is PM456";
    }

    let response = twilioClient.sendSms(phoneNumber, TimeStatus);
    res.send(response);

});

module.exports = router;

