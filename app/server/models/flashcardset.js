

// load the things we need
var mongoose = require('mongoose');

// define the schema for our flashcardset model
var FlashcardSet_Schema = mongoose.Schema({
        category: String
});

module.exports = mongoose.model('FlashcardSet', FlashcardSet_Schema);