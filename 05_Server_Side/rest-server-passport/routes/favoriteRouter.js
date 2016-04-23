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
).post(
).delete(
);

favoriteRouter.route('/:dishObjectId')

.all(Verify.verifyOrdinaryUser)

delete(
);

module.exports = favoriteRouter;
