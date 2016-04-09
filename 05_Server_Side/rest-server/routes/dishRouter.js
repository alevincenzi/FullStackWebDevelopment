var express    = require('express');
var util       = require('util');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');

var Dishes = require('../models/dishes');
	
var dishRouter = express.Router();

dishRouter.use(bodyParser.json());

dishRouter.route('/')
.get(
    Dishes.find(
		{},
		function (err, dish) {
			
			if (err) throw err;
			res.json(dish);
		}
	);
).post(
    Dishes.create(
		req.body,
		function (err, dish) {
			
			if (err) throw err;
			console.log('Dish created!');
			
			var id = dish._id;

			res.writeHead(200, {
				'Content-Type': 'text/plain'
			});
			res.end('Added the dish with id: ' + id);
		}
	);
).delete(
    Dishes.remove(
		{},
		function (err, resp) {
			
			if (err) throw err;
			res.json(resp);
		}
	);
);

dishRouter.route('/:dishId')
.get(
    Dishes.findById(
		req.params.dishId,
		function (err, dish) {
			
			if (err) throw err;
			res.json(dish);
		}
	);
).put(
    Dishes.findByIdAndUpdate(
		req.params.dishId,
		{ $set: req.body },
		{ new: true },
		function (err, dish) {
        
			if (err) throw err;
			res.json(dish);
		}
	);
).delete(
    Dishes.findByIdAndRemove(
		req.params.dishId,
		function (err, resp) {

			if (err) throw err;
			res.json(resp);
		}
	);
);

module.exports = dishRouter;