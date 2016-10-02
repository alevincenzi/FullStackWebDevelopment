var express    = require('express');
var util       = require('util');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');

var Events = require('../models/events');
var Verify = require('./verify');
    
var eventRouter = express.Router();

eventRouter.use(bodyParser.json());

eventRouter.route('/')

.get(
    function (req, res, next) {
        
        Events.find(req.query)
        
            .populate('createdBy')
            .populate('comments.postedBy')
            .exec(
                function (err, eevent) {
                    if (err) next(err);
                    res.json(eevent);
                });
    }
).post(
    Verify.verifyOrdinaryUser,
    
    function (req, res, next) {
        
        req.body.createdBy = req.decoded._id;
        
        Events.create(req.body,
            
            function (err, eevent) {
                
                if (err) next(err);
                
                console.log('Event created!');
                
                var id = eevent._id;
                
                res.writeHead(200, {
                    'Content-Type': 'text/plain'
                });
                res.end('Added the event with id: ' + id);
            }
        );
    }
).delete(
    Verify.verifyOrdinaryUser,
    Verify.verifyAdmin,

    function (req, res, next) {
        
        Events.remove({},
            
            function (err, resp) {
                if (err) next(err);
                res.json(resp);
            }
        );
    }
);

eventRouter.route('/:eventId')

.get(    
    Verify.verifyOrdinaryUser,

    function (req, res, next) {
        
        Events.findById(req.params.eventId)
        
            .populate('createdBy')
            .populate('comments.postedBy')
            .exec(
                function (err, eevent) {
                    if (err) next(err);
                    res.json(eevent);
                });
    }
).put(
    Verify.verifyOrdinaryUser,
    
    function (req, res, next) {
        
        Events.findByIdAndUpdate(req.params.eventId,
        
            { $set : req.body }, { new : true },
    
            function (err, eevent) {
                if (err) next(err);
                res.json(eevent);
            }
        );
    }
).delete(
    Verify.verifyOrdinaryUser,

    function (req, res, next) {
        
        Events.findByIdAndRemove(req.params.eventId,
            
            function (err, resp) {
                if (err) next(err);
                res.json(resp);
            }
        );
    }
);

eventRouter.route('/:eventId/comments')

.get(    
    Verify.verifyOrdinaryUser,

    function (req, res, next) {    
        
        Events.findById(req.params.eventId)
            
            .populate('createdBy')
            .populate('comments.postedBy')
            .exec(
                function (err, eevent) {
                    if (err) next(err);
                    res.json(eevent.comments);
                });
    }
).post(
    Verify.verifyOrdinaryUser,

    function (req, res, next) {
        
        Events.findById(req.params.eventId,
            
            function (err, eevent) {
                
                if (err) next(err);
                
                req.body.postedBy = req.decoded._id;
                
                eevent.comments.push(req.body);
                
                eevent.save(
                    function (err, eevent) {
                        if (err) next(err);
                        console.log('Updated Comments!');
                        res.json(eevent);
                    }
                );
            }
        );
    }
).delete(
    Verify.verifyOrdinaryUser,
    Verify.verifyAdmin,
    
    function (req, res, next) {
        
        Events.findById(req.params.eventId,
            
            function (err, eevent) {
            
                if (err) next(err);
    
                for (var i = (eevent.comments.length - 1); i >= 0; i--) {
                    eevent.comments.id(eevent.comments[i]._id).remove();
                }
                
                eevent.save(
                    function (err, result) {
                        if (err) next(err);
                        res.writeHead(200, {
                            'Content-Type': 'text/plain'
                        });
                        res.end('Deleted all comments!');
                    }
                );
            }
        );
    }
);

eventRouter.route('/:eventId/comments/:commentId')

.get(
    Verify.verifyOrdinaryUser,

    function (req, res, next) {
        
        Events.findById(req.params.eventId)
        
            .populate('createdBy')
            .populate('comments.postedBy')
            .exec(
                function (err, eevent) {
                    if (err) next(err);
                    res.json(eevent.comments.id(req.params.commentId));
                });
    }
).put(
    Verify.verifyOrdinaryUser,

    function (req, res, next) {
        
        Events.findById(req.params.eventId,
            
            function (err, eevent) {
                
                if (err) next(err);
                
                eevent.comments.id(req.params.commentId).remove();
                
                req.body.postedBy = req.decoded._id;
                
                eevent.comments.push(req.body);
                
                eevent.save(
                    function (err, eevent) {
                        if (err) next(err);
                        console.log('Updated Comments!');
                        res.json(eevent);
                    }
                );
            }
        );
    }
).delete(
    Verify.verifyOrdinaryUser,
    
    function (req, res, next) {
        
        Events.findById(req.params.eventId,
            
            function (err, eevent) {

                var postedBy = eevent.comments.id(req.params.commentId).postedBy;

                if (postedBy != req.decoded._id) {
                    var err = new Error(
                        'You are not authorized to perform this operation!');
                    err.status = 403;
                    return next(err);
                }

                eevent.comments.id(req.params.commentId).remove();
                eevent.save(
                    function (err, resp) {
                        if (err) next(err);
                        res.json(resp);
                    }
                );
            }
        );
    }
);

module.exports = eventRouter;
