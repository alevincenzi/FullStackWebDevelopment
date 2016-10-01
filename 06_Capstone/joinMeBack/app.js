var express       = require('express');
var path          = require('path');
var logger        = require('morgan');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');
var mongoose      = require('mongoose');
var passport      = require('passport');

var config         = require('./config');
var authenticate   = require('./authenticate');
var routes         = require('./routes/index');
var users          = require('./routes/users');
var dishRouter     = require('./routes/dishRouter');
var promoRouter    = require('./routes/promoRouter');
var leaderRouter   = require('./routes/leaderRouter');
var favoriteRouter = require('./routes/favoriteRouter');

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
app.use('/api/users',      users);
app.use('/api/dishes',     dishRouter);
app.use('/api/promotions', promoRouter);
app.use('/api/leaders',    leaderRouter);
app.use('/api/favorites',  favoriteRouter);

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
