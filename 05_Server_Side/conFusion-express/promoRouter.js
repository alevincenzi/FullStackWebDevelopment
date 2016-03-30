var express    = require('express');
var util       = require('util');
var bodyParser = require('body-parser');

var getPromotions =
	'Will send all the promotions to you!';
var postPromotions =
	'Will add the promotion: %s with details: %s';
var deletePromotions =
	'Deleting all promotions';
var getPromotionById =
	'Will send details of the promotion: %d to you!';
var putPromotionById =
	'Updating the promotion: %d\n' +
	'Will update the promotion: %s with details: %s';
var deletePromotionById =
	'Deleting promotion: %d';
	
var promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/')
.all(
	function(req, res, next) {
		res.writeHead(200, { 'Content-Type': 'text/plain' });
		next();
	}
).get(
	function(req, res, next){
		res.end(getPromotions);
	}
).post(
	function(req, res, next){
		res.end(util.format(postPromotions, req.body.name, req.body.description));    
	}
).delete(
	function(req, res, next){
		res.end(deletePromotions);
	}
);

promoRouter.route('/:promoId')
.all(
	function(req, res, next) {
		res.writeHead(200, { 'Content-Type': 'text/plain' });
		next();
	}
).get(
	function(req, res, next){
        res.end(util.format(getPromotionById, req.params.promoId));
	}
).put(
	function(req, res, next){
		res.end(util.format(putPromotionById, req.params.promoId, req.body.name, req.body.description));
	}
).delete(
	function(req, res, next){
		res.end(util.format(deletePromotionById, req.params.promoId));
	}
);

module.exports = promoRouter;