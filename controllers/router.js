// lets map routes to controller
const express = require('express');
const router = express.Router();
const phone       =   require('phone');
var config = require('../config');
var client = require('twilio')(config.accountSid, config.authToken);

router.post('/api/sms-promotion', function(req, res) {
    //res.writeHead(200, {'Content-Type': 'text/plain'});
    let phoneNumber_array = phone(req.body.phone);
    let phoneNumber = phoneNumber_array[0];
    let TimeStatus = '';
    let datetime = new Date();
    if (datetime.getHours() < 12) {
        TimeStatus = "Good morning! Your promocode is AM123";
    } else {
        TimeStatus = "Hello! Your promocode is PM456";
    }
    client.messages.create({ 
        to      :   phoneNumber,
        from    :   config.sendingNumber, 
        body    :   TimeStatus, 
    }, function(err, message) {
         if (!err) {
            res.send("Message was send successfully.");
        } else {
            res.send("There was erorr sending a sms. Please try again later.");
        }
    });
});

module.exports = router;

