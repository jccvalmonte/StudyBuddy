var mongoose = require('mongoose');

module.exports = mongoose.model('FlashcardSet', {
	category: String
});