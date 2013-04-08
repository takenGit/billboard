
/**
 * Module dependencies.
 */
var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , fs = require('fs');

var app = express()
  , server = require('http').createServer(app);

// Log Directory
var logDir = path.join(__dirname, 'log');

// Config
app.configure('production', function(){
  app.use(express.errorHandler());
});
app.configure('development', function(){
  app.use(express.errorHandler());
});
app.configure(function(){
  app.set('port', process.env.PORT || 8080);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger({
  	stream : fs.createWriteStream(path.join(logDir, 'access.log'), {flag : 'a'})
  }));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

// Routes
app.get('/', routes.index);

// Listen
var server = http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

// Socket.IO
// log level (0 error| 1 warn | 2 info | 3 debug)
var io = require("socket.io").listen(server, {'log level': 1});
io.sockets.on('connection', function (socket) {
	// DataReceive
	socket.on('message', function(msg) {
		io.sockets.emit("message", msg);
		
		// MessageLog
		var now = new Date().toLocaleString();
		var msgLog = now + "\t" + JSON.stringify(msg);
		console.log(msgLog);
		fs.appendFile(path.join(logDir, 'message.log'), msgLog + "\n", function(err) {
			if (err) throw err;
		});
		
	});
});


