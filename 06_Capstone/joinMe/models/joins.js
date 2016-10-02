var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var joinSchema = new Schema(
	{
		joinedBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
        events : [{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Event'
		}]
	},
	{ timestamps: true }
);

var Joins = mongoose.model('Join', joinSchema);

module.exports = Joins ;
