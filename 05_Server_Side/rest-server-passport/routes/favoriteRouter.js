var express    = require('express');
var util       = require('util');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');

var Favorites = require('../models/favorites');
var Verify    = require('./verify');
	
var favoriteRouter = express.Router();

favoriteRouter.use(bodyParser.json());

favoriteRouter.route('/')

.all(Verify.verifyOrdinaryUser)

.get(
	function (req, res, next) {
		Favorites
            .findOne({ "postedBy" : req.decoded._doc._id })
			.populate('postedBy')
			.populate('dishes')
			.exec(
				function (err, favorite) {
					if (err) throw err;
					res.json(favorite);
				}
            );
	}
).post(
	function (req, res, next) {
    }
).delete(
	function (req, res, next) {
    }
);

favoriteRouter.route('/:dishObjectId')

.all(Verify.verifyOrdinaryUser)

delete(
	function (req, res, next) {
    }
);

module.exports = favoriteRouter;
