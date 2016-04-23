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
        Favorites.findOne(
            { "postedBy" : req.decoded._doc._id },
            
            function (err, favorite) {
                if (err) throw err;
                
                if (favorite) {
                    if (favorite.dishes.indexOf(req.body._id) == -1){
                        favorite.dishes.push(req.body._id);
                    }
                }
                else {
                    favorite = new Favorites(
                        { "postedBy" : req.decoded._doc._id});
                    favorite.dishes.push(req.body._id);
                }
                        
                favorite.save(
                    function (err, favorite) {
                        if (err) throw err;
                        res.json(favorite);
                    }
                );
            }
        );
    }
).delete(
	function (req, res, next) {
		Favorites
            .remove({ "postedBy" : req.decoded._doc._id },
			function (err, resp) {
				if (err) throw err;
				res.json(resp);
			}
		);
	}
);

favoriteRouter.route('/:dishObjectId')

.all(Verify.verifyOrdinaryUser)

delete(
	function (req, res, next) {
    }
);

module.exports = favoriteRouter;
