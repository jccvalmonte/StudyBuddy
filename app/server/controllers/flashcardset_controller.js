var FlashcardSet = require('../models/flashcardset');

module.exports.create = function(req, res){

	var cards = new FlashcardSet(req.body);
	cards.save(function (err, result){
		res.json(result);
	}); //save to MongoDb database
	}

module.exports.list = function(req, res){
    FlashcardSet.find({}, function (err, results){
    	res.json(results);
    });

}	