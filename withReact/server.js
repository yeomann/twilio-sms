/* eslint no-console: 0 */

const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');

var bodyParser  =   require('body-parser');
var client      =   require('twilio')('ACf7fe44e80cfffa283198e81319153f8d', '422e01b296c56fcad01cf41ccf9fedda');
var phone       =   require('phone');


const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;
const app = express();

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());

if (isDeveloping) {
    const compiler = webpack(config);
    const middleware = webpackMiddleware(compiler, {
        publicPath: config.output.publicPath,
        contentBase: 'src',
        stats: {
            colors: true,
            hash: false,
            timings: true,
            chunks: false,
            chunkModules: false,
            modules: false
        }
    });

    app.use(middleware);
    app.use(webpackHotMiddleware(compiler));

    app.get('*', function response(req, res) {
        res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
        res.end();
    });

    app.post('/api/sms-promotion', function(req, res) {
        console.log('Coming from server' + JSON.stringify(req.body));

        res.writeHead(200, {'Content-Type': 'text/plain'});
        var phoneNumber_array = phone(req.body.phone);
        var phoneNumber = phoneNumber_array[0];
        var TimeStatus = '';
        var datetime = new Date();
        var twilio_status =  false;
        if (phoneNumber === undefined) {
            phoneNumber = "There was erorr in your phone number, Please check format, \
            Correct format is <b>e.g +852 6569-8900, (817) 569-8900, +85265698900, +90(533) 856-4166</b> depending upon your country."
        }
        //console.log(typeof phoneNumber);

        if (datetime.getHours() < 12) {
            TimeStatus = "Good morning! Your promocode is AM123";
        } else {
            TimeStatus = "Hello! Your promocode is PM456";
        }
        client.messages.create({ 
            to      :   phoneNumber,
            from    :   "+15128799448", 
            body    :   TimeStatus, 
        }, function(err, message) {
             if (!err) { // "err" is an error received during the request, if any
                // "responseData" is a JavaScript object containing data received from Twilio.
                // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
                // http://www.twilio.com/docs/api/rest/sending-sms#example-1
                console.log(message.sid);   
                console.log(message.from); // outputs "+14506667788"
                console.log(message.body); // outputs "word to your mother."s
                res.end("Message was send successfully.");
            } else {
                twilio_status = true;
                console.log('There was a error sending, Please check Phone number.');
                res.end("There was erorr sending a sms. Please try again later.");
            }
        });

    });

    app.get('/test3', function(req, res) {
        res.send('Hello3');
    });


} else {
    app.use(express.static(__dirname + '/dist'));
    app.get('*', function response(req, res) {
        res.sendFile(path.join(__dirname, 'dist/index.html'));
    });
}

app.listen(port, '0.0.0.0', function onStart(err) {
    if (err) {
        console.log(err);
    }
    console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});
