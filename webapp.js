/* eslint no-console: 0 */
// Declaring first requirements
const path                  = require('path');
const express               = require('express');
const webpack               = require('webpack');
const webpackMiddleware     = require('webpack-dev-middleware');
const webpackHotMiddleware  = require('webpack-hot-middleware');
const webpackconfig         = require('./webpack.config.js');
const bodyParser            =   require('body-parser');
const isDeveloping          = process.env.NODE_ENV !== 'production';
const port                  = isDeveloping ? 3000 : process.env.PORT;
const app                   = express();
// Routes
let smsRoute                = require('./controllers/router');
// bodyparser options
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());
// first check if it is on going development project
if (isDeveloping) {
    /*
    *   @summary Middlewear options here 
    *   @see {http://madole.github.io/blog/2015/08/26/setting-up-webpack-dev-middleware-in-your-express-application/}
    */
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
    /*
    *   @summary For whatever the URL is just go to index
    */
    app.get('*', function response(req, res) {
        res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
        res.end();
    });
    /*
    *   @summary calling 'api/sms-promotion'
    *   @request POST
    *   @see smsRoute and 'controller/router'
    *   @return response as text
    */
    app.use(smsRoute);

} else {
    // Lets assign static content for Production
    app.use(express.static(__dirname + '/dist'));
    /*
    *   @summary For whatever the URL is just go to index
    */
    app.get('*', function response(req, res) {
        res.sendFile(path.join(__dirname, 'dist/index.html'));
    });
    /*
    *   @summary calling 'api/sms-promotion'
    *   @request POST
    *   @see smsRoute and 'controller/router'
    *   @return response as text
    */
    app.use(smsRoute);
}
/*
*   @summary Creating Express server for Exporting outsite
*/
let startServer = app.listen(port, '0.0.0.0', function onStart(err) {
    if (err) {
        console.log(err);
    }
    console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});

// export these modules outside to Main app file
module.exports = isDeveloping;
module.exports = port;
module.exports = startServer;