var express       = require('express');
var path          = require('path');
var logger        = require('morgan');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');
var mongoose      = require('mongoose');
var passport      = require('passport');

var config       = require('./config');
var authenticate = require('./authenticate');
var users        = require('./routes/users');
var eventRouter  = require('./routes/eventRouter');
var joinRouter   = require('./routes/joinRouter');

mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUrl);

var db = mongoose.connection;

db.on('error',
	console.error.bind(console, 'connection error:'));

db.once('open',
	function () {
		// we're connected!
		console.log("Connected correctly to server");
	}
);

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// passport config
app.use(passport.initialize());

app.use(express.static(__dirname + '/dist'));
app.use('/api/users',  users);
app.use('/api/events', eventRouter);
app.use('/api/joins',  joinRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(
		function(err, req, res, next) {
			res.status(err.status || 500);
			res.json({
				message: err.message,
				error: err
			});
		}
	);
}

// production error handler
// no stacktraces leaked to user
app.use(
	function(err, req, res, next) {
		res.status(err.status || 500);
		res.json({
			message: err.message,
			error: {}
		});
	}
);

module.exports = app;
