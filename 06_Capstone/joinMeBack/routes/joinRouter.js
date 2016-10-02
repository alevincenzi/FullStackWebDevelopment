var express    = require('express');
var util       = require('util');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');

var Joins  = require('../models/joins');
var Verify = require('./verify');
    
var joinRouter = express.Router();

joinRouter.use(bodyParser.json());

joinRouter.route('/')

.all(Verify.verifyOrdinaryUser)

.get(

    function (req, res, next) {
        
        Joins.findOne({ "joinedBy" : req.decoded._id })

            .populate('joinedBy')
            .populate('events')
            .exec(
                function (err, join) {
                    if (err) throw err;
                    res.json(join);
                }
            );
    }

).post(

    function (req, res, next) {
        
        Joins.findOne({ "joinedBy" : req.decoded._id },
            
            function (err, join) {
                if (err) throw err;
                
                if (join) {
                    if (join.events.indexOf(req.body._id) == -1){
                        join.events.push(req.body._id);
                    }
                }
                else {
                    join = new Joins({"joinedBy" : req.decoded._id});
                    join.events.push(req.body._id);
                }
                        
                join.save(
                    function (err, join) {
                        if (err) throw err;
                        res.json(join);
                    }
                );
            }
        );
    }

).delete(

    function (req, res, next) {
        
        Joins.remove({ "joinedBy" : req.decoded._id },
            
            function (err, resp) {
                if (err) throw err;
                res.json(resp);
            }
        );
    }
);

joinRouter.route('/:eventId')

.all(Verify.verifyOrdinaryUser)

.delete(

    function (req, res, next) {
        
        Joins.findOne({ "joinedBy" : req.decoded._id },
            
            function (err, join) {
                
                if (err) throw err;
                
                if (join){
                    
                    var pos = join.events.indexOf(req.params.eventId);

                    if (pos != -1){
                        
                        join.events.splice(pos, 1);
                
                        join.save(
                            function (err, join) {
                                if (err) throw err;
                            }
                        );
                    }
                    
                    res.json(join);                    
                } else {
                    var err = new Error('Join not found!');
                    err.status = 404;
                    return next(err);
                }
            }
        );
    }
);

module.exports = joinRouter;
