## Install and Running
`git clone https://github.com/yeomann/twilio-sms`

or just export the files:

`svn export https://github.com/yeomann/twilio-sms/trunk ./dir`

1. cd twilio-sms
2. `npm install`
3. `npm start`
4. navigate to http://localhost:3000 in your browser of choice.


## Build
1. `npm run build`
2. `npm run runbuild`

after building, you can run from terminal using `PORT=1234 NODE_ENV=production node server.js` instead `npm run build`.

If you wanna change port for Procution, Then see in `packages.json` under "runbuild" key, specify PORT yourself or from terminal, you can write directly `PORT=1234 NODE_ENV=production node server.js`.

NOTE: upon running `npm run build`, if no build folder was created then please make sure that webpack is installed globally or install it by running `npm install -g webpack`. you might need `sudo` for that.

## FAQ
Incase of port error or error like below,

```
events.js:160
      throw er; // Unhandled 'error' event
      ^

Error: listen EADDRINUSE 0.0.0.0:3000
    at Object.exports._errnoException (util.js:1007:11)
    at exports._exceptionWithHostPort (util.js:1030:20)
    at Server._listen2 (net.js:1253:14)
    at listen (net.js:1289:10)
```

Plese make sure that your PORT 3000 is free,
Incase of linux you can make it free using
1. `lsof -i tcp:3000`
see the results with node name like below
`node    10960 yeoman   13u  IPv4  86767      0t0  TCP *:3000 (LISTEN)` //since the status is LISTENING, we need to kill that.
2. `kill -9 10960` // the code 10960 is the process id, can be see on above statement, Will be different for you.
3. `npm run runbuild` //run again

### React by default
The project runs with React by default and hot replacement of changes to the modules.

### CSS Modules
CSS files loaded into components are locally scoped and you can point to class names with javascript. You can also compose classes together, also from other files. These are also hot loaded. Read more about them [here](http://glenmaddern.com/articles/css-modules).

To turn off CSS Modules remove it from the `webpack.config.js` file.

### Babel and Linting
Both Node server and frontend code runs with Babel. And all of it is linted.

