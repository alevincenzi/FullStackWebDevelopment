var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var leaderSchema = new Schema(
	{
		name: {
			type:     String,
			required: true,
			unique:   true
		},
		image: {
			type:     String,
			required: true			
		},
		designation: {
			type:     String,
			required: true
		},
		abbr: {
			type:     String,
			required: false,
			default:  ""
		},
        featured: {
            type:     Boolean,
            default:  false
        },
		description: {
			type:     String,
			required: true
		}
	},
	{ timestamps: true }
);

var Leaders = mongoose.model('Leadership', leaderSchema);

module.exports = Leaders;
