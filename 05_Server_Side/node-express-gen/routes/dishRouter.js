var express    = require('express');
var util       = require('util');
var bodyParser = require('body-parser');

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

module.exports = dishRouter;