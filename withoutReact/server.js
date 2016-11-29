var http 		= 	require('http');
var path 		=   require('path');
var express 	= 	require('express');
var app		 	= 	express();
var bodyParser 	= 	require('body-parser');
//require the Twilio module and create a REST client
var client 		=   require('twilio')('ACf7fe44e80cfffa283198e81319153f8d', '422e01b296c56fcad01cf41ccf9fedda');
var phone 		=   require('phone');


app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());


app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, '/public'));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

/*
*
*/
app.get('/', function(req, res) {
    res.render('index.html');
});

app.post('/api/sms-promotion', function(req, res) {
	// res.type('json');
	// res.setHeader('content-type', 'text/javascript');
	res.writeHead(200, {'Content-Type': 'text/plain'});
	//res.send("you send " + JSON.stringify(req.body) + " and phone is " + req.body.phone + "....");
	var phoneNumber_array = phone(req.body.phone);
	var phoneNumber = phoneNumber_array[0];
	var TimeStatus = '';
	var datetime = new Date();
	var twilio_status =  false;
	if (phoneNumber === undefined) {
		phoneNumber = "<div>There was erorr in your phone number, Please check format, \
		Correct format is <b>e.g +852 6569-8900, (817) 569-8900, +85265698900, +90(533) 856-4166</b> depending upon your country.<div>"
	}
	//console.log(typeof phoneNumber);

	if (datetime.getHours() < 12) {
		TimeStatus = "Good morning! Your promocode is AM123";
	} else {
		TimeStatus = "Hello! Your promocode is PM456";
	}
	client.messages.create({ 
	    to 		: 	phoneNumber,
	    from 	: 	"+15128799448", 
	    body 	: 	TimeStatus, 
	}, function(err, message) {
		 if (!err) { // "err" is an error received during the request, if any
	        // "responseData" is a JavaScript object containing data received from Twilio.
	        // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
	        // http://www.twilio.com/docs/api/rest/sending-sms#example-1
			console.log(message.sid); 	
	        console.log(message.from); // outputs "+14506667788"
	        console.log(message.body); // outputs "word to your mother."s
	    	res.end("<div>Message was send successfully.<div>");
	    } else {
	    	twilio_status = true;
	    	console.log('There was a error sending, Please check Phone number.');
	    	res.end("<div>There was erorr sending a sms. Please try again later.<div>");
	    }
	});

});


/*
* test
*/
app.post('/senddata', function(req, res) {
    res.send('Hello');
});




// http.createServer(function(req, res) {
// 	res.writeHead(200, {'Content-Type' : 'text/plain'});
// 	res.end('Hello world \n');
// }).listen(3001);
/*
*
*/
/*
*
*/
app.get('/time', function(req, res) {
	var TimeStatus = '';
	var datetime = new Date();
	console.log(datetime);
	if (datetime.getHours() < 12) {
		TimeStatus = "Good morning! Your promocode is AM123";
	} else {
		TimeStatus = "Hello! Your promocode is PM456";
	}
	res.send( 'nothing ' + datetime.getHours() + "status = " + TimeStatus);
});

/*
*
*/
app.get('/test', function(req, res) {
    res.render('test.html');
});

app.get('/testsend', function(req, res) {
	//Send an SMS text message
	client.sendMessage({
	    to:'+905338564166', // Any number Twilio can deliver to
	    from: '+15128799448', // A number you bought from Twilio and can use for outbound communication
	    body: 'Hello world' // body of the SMS message

	}, function(err, responseData) { //this function is executed when a response is received from Twilio
	    if (!err) { // "err" is an error received during the request, if any
	        // "responseData" is a JavaScript object containing data received from Twilio.
	        // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
	        // http://www.twilio.com/docs/api/rest/sending-sms#example-1
	        console.log(responseData.from); // outputs "+14506667788"
	        console.log(responseData.body); // outputs "word to your mother."s
	    } else {
	    	console.log('there was a error');
	    }
	});

});

app.listen(3003);
console.log('Server Running at localhost:3003');
