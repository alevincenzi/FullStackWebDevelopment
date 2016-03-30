var express    = require('express');
var morgan     = require('morgan');
var util       = require('util');
var bodyParser = require('body-parser');

var hostname = 'localhost';
var port = 3000;

var getDishes =
	'Will send all the dishes to you!';
var postDishes =
	'Will add the dish: %s with details: %s';
var deleteDishes =
	'Deleting all dishes';
var getDishById =
	'Will send details of the dish: %d to you!';
var putDishById =
	'Updating the dish: %d\n' +
	'Will update the dish: %s with details: %s';
var deleteDishById =
	'Deleting dish: %d';

var app = express();

app.use(morgan('dev'));

var dishRouter = express.Router();

dishRouter.use(bodyParser.json());

dishRouter.route('/')
.all(
	function(req, res, next) {
		res.writeHead(200, { 'Content-Type': 'text/plain' });
		next();
	}
).get(
	function(req, res, next){
		res.end(getDishes);
	}
).post(
	function(req, res, next){
		res.end(util.format(postDishes, req.body.name, req.body.description));    
	}
).delete(
	function(req, res, next){
		res.end(deleteDishes);
	}
);

dishRouter.route('/:dishId')
.all(
	function(req, res, next) {
		res.writeHead(200, { 'Content-Type': 'text/plain' });
		next();
	}
).get(
	function(req, res, next){
        res.end(util.format(getDishById, req.params.dishId));
	}
).put(
	function(req, res, next){
		res.end(util.format(putDishById, req.params.dishId, req.body.name, req.body.description));
	}
).delete(
	function(req, res, next){
		res.end(util.format(deleteDishById, req.params.dishId));
	}
);

app.use('/dishes', dishRouter);

app.use(express.static(__dirname + '/public'));

app.listen(port, hostname,

	function(){
		console.log(`Server running at http://${hostname}:${port}/`);
	}
);