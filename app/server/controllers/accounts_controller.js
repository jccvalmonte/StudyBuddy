var Accounts = require('../models/accounts');

module.exports.create = function(req, res){

	var accounts = new Accounts(req.body);
	accounts.save(function (err, result){
		res.json(result);
	}); //save to MongoDb database
	}

module.exports.list = function(req, res){
    Accounts.find({}, function (err, results){
    	res.json(results);
    });

}	