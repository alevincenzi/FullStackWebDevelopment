var mongoose = require('mongoose');
var assert = require('assert');

var Leaderships = require('./models/leaderships');

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';

mongoose.connect(url);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {

    console.log("Connected correctly to server");

    // create a new leadership
    Leaderships.create(
	{
		name: "Peter Pan",
		image: "images/alberto.png",
		designation: "Chief Epicurious Officer",
		abbr: "CEO",
		description: "Our CEO, Peter, ..."
	},
	function (err, leadership) {
    
		if (err) throw err;
        
		console.log('Leadership created!');
        console.log(leadership);

        var id = leadership._id;

        // get all the leaderships
        setTimeout(function () {

			Leaderships.findByIdAndUpdate(id,
			{
				$set: {
					description: 'Updated Test'
                }
            },
			{
				new: true
            }).exec(
				function (err, leadership) {
						
					if (err) throw err;
				
					console.log('Updated Leadership!');
					console.log(leadership);

					db.collection('Leaderships').drop(function () {
						db.close();
					});
				});
        }, 3000);
    });
});

