var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema(
	{
		comment:  {
			type: String,
			required: true
		},
		postedBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		}
	},
	{ timestamps: true }
);

var eventSchema = new Schema(
	{
        title: {
            type:     String,
			required: true,
        },
		image: {
			type:     String,
			required: true			
		},
		description: {
			type:     String,
			required: true
		},
		place: {
			type:     String,
			required: true
		},
		dateAndTime: {
			type:     String,
			required: true
		},
		participants: {
			type:     String,
			required: true
		},
		cost: {
			type:     String,
			required: true				
		},
		tags: {
			type:     String,
			required: true
		},
		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
		comments: [
            commentSchema
        ]
  	},
	{ timestamps: true }
);

var Events = mongoose.model('Event', eventSchema);

module.exports = Events;
