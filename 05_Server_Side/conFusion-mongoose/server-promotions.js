var mongoose = require('mongoose');
var assert = require('assert');

var Promotions = require('./models/promotions');

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';

mongoose.connect(url);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {

    console.log("Connected correctly to server");

    // create a new promotion
    Promotions.create(
	{
		name: "Weekend Grand Buffet",
		image: "images/buffet.png",
		label: "New",
		price: "$19.99",
		description: "Featuring ..."
	},
	function (err, promotion) {
    
		if (err) throw err;
        
		console.log('Promotion created!');
        console.log(promotion);

        var id = promotion._id;

        // get all the promotions
        setTimeout(function () {

			Promotions.findByIdAndUpdate(id,
			{
				$set: {
					description: 'Updated Test'
                }
            },
			{
				new: true
            }).exec(
				function (err, promotion) {
						
					if (err) throw err;
				
					console.log('Updated Promotion!');
					console.log(promotion);

					db.collection('promotions').drop(function () {
						db.close();
					});
				});
        }, 3000);
    });
});

