

// load the things we need
var mongoose = require('mongoose');

// define the schema for our account model
var Accounts_Schema = mongoose.Schema({
        category: String
});

module.exports = mongoose.model('Accounts', Accounts_Schema);