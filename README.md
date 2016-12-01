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

after running first build command, there will be build folder generated for you. To run production, Please type command number two i.e  `npm run build` OR you can directly write this command in terminal window `PORT=1234 NODE_ENV=production node server.js`

###Change Port

In order to change port, Refer to `packages.json` under "runbuild" key, specify PORT yourself or from terminal, you can write directly `PORT=1234 NODE_ENV=production node server.js`.

NOTE: Upon running `npm run build`, if no build folder was created then please make sure that webpack is installed globally or install it by running `npm install -g webpack`. you might need `sudo` for that.

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

Plese make sure that your PORT 3000 is free and no other program is using,
Incase of linux you can make it free using following instructions.

1. `lsof -i tcp:3000`
see the results with node name like below
`node    10960 yeoman   13u  IPv4  86767      0t0  TCP *:3000 (LISTEN)` //since the status is LISTENING, we need to kill the node process in order to reuse this port.

2. `kill -9 10960` // the number 10960 is the process ID, can be seen on above statement, will be different for you.

3. `npm run runbuild` //run again


### React by default
The project runs with React by default and hot replacement of changes to the modules.

### CSS Modules
CSS files loaded into components are locally scoped and you can point to class names with javascript. You can also compose classes together, also from other files. These are also hot loaded. Read more about them [here](http://glenmaddern.com/articles/css-modules).

To turn off CSS Modules remove it from the `webpack.config.js` file.

### Babel and Linting
Both Node server and frontend code runs with Babel. And all of it is linted.