var express    = require('express');
var util       = require('util');
var bodyParser = require('body-parser');

var getLeaders =
	'Will send all the leaders to you!';
var postLeaders =
	'Will add the leader: %s with details: %s';
var deleteLeaders =
	'Deleting all leaders';
var getLeaderById =
	'Will send details of the leader: %d to you!';
var putLeaderById =
	'Updating the leader: %d\n' +
	'Will update the leader: %s with details: %s';
var deleteLeaderById =
	'Deleting leader: %d';
	
var leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.all(
	function(req, res, next) {
		res.writeHead(200, { 'Content-Type': 'text/plain' });
		next();
	}
).get(
	function(req, res, next){
		res.end(getLeaders);
	}
).post(
	function(req, res, next){
		res.end(util.format(postLeaders, req.body.name, req.body.description));    
	}
).delete(
	function(req, res, next){
		res.end(deleteLeaders);
	}
);

leaderRouter.route('/:leaderId')
.all(
	function(req, res, next) {
		res.writeHead(200, { 'Content-Type': 'text/plain' });
		next();
	}
).get(
	function(req, res, next){
        res.end(util.format(getLeaderById, req.params.leaderId));
	}
).put(
	function(req, res, next){
		res.end(util.format(putLeaderById, req.params.leaderId, req.body.name, req.body.description));
	}
).delete(
	function(req, res, next){
		res.end(util.format(deleteLeaderById, req.params.leaderId));
	}
);

module.exports = leaderRouter;