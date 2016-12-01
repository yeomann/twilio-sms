// laoding dotenv module
var dotenv = require('dotenv');

// creating cfg object for storing twilio info
var cfg = {};

// load .env file
dotenv.config({path: '.env'});

// creating Neccessary twilio information as cfg object
cfg.accountSid = process.env.TWILIO_ACCOUNT_SID;
cfg.authToken = process.env.TWILIO_AUTH_TOKEN;
cfg.sendingNumber = process.env.TWILIO_NUMBER;

// Export configuration object
module.exports = cfg;
