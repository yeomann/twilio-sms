// lets map routes to controller
var express = require('express');
var router = express.Router();
const bodyParser  =   require('body-parser');
const phone      =   require('phone');
var client = require('../twilioClient');

router.post('/api/sms-promotion', function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    let phoneNumber_array = phone(req.body.phone);
    let phoneNumber = phoneNumber_array[0];
    let TimeStatus = '';
    let datetime = new Date();
    if (phoneNumber === undefined) {
        phoneNumber = "There was erorr in your phone number, Please check format, \
        Correct format is <b>e.g +852 6569-8900, (817) 569-8900, +85265698900, +90(533) 856-4166</b> depending upon your country."
    }

    if (datetime.getHours() < 12) {
        TimeStatus = "Good morning! Your promocode is AM123";
    } else {
        TimeStatus = "Hello! Your promocode is PM456";
    }
   
    client.sendSms(phoneNumber, TimeStatus);

});

module.exports = router;

