const path = require('path');
const express = require('express');
const bodyParser  =   require('body-parser');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackconfig = require('./webpack.config.js');

// const route = require('./controllers/router');
const phone     =   require('phone');
const client    = require('./twilioClient');

const config    = require('./config');
// const client      =   require('twilio')('ACf7fe44e80cfffa283198e81319153f8d', '422e01b296c56fcad01cf41ccf9fedda');
// const phone       =   require('phone');


const isDeveloping = config.isDeveloping;
const port = config.port;
const app = express();

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());

if (isDeveloping) {
    const compiler = webpack(webpackconfig);
    const middleware = webpackMiddleware(compiler, {
        publicPath: webpackconfig.output.publicPath,
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

    // app.get('*', function response(req, res) {
    //     res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
    //     res.end();
    // });

    app.get('/test1', function(req, res) {
        res.send('test');
    });

    app.post('/api/sms-promotion', function(req, res) {
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
       
        // client.sendSms(phoneNumber, TimeStatus);
        res.send('coming from server');
    });
   
    // app.use('/api/sms-promotion', route);

} else {
    app.use(express.static(__dirname + '/dist'));
    app.get('*', function response(req, res) {
        res.sendFile(path.join(__dirname, 'dist/index.html'));
    });
}


module.exports = app;