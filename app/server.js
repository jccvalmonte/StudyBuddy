/** Data created on: 4/27/2016
This is the 'main' entry point for our Node server, This
is how we will run are Node Application **/

var express           		= require ('express'),
	app    			 		= express(), //for express we have defined a new 'app'
	bodyParser              = require('body-parser'),
	mongoose                = require('mongoose'),
	url 					= require('url');
	
//For the above app we need to define some routes
//anyone makes a request to the route directory; 
//respond by sending a file named index.html

//initializing mongoose connection to the MongoDB database
//route to database held in 'db.config'
var mongoDBConnection = require('./db.config');
mongoose.connect(mongoDBConnection.uri);
console.log(mongoDBConnection.uri);

//global variables to access the schema models
var Sets;
var Cards;

app.use(bodyParser());

//app.use(express.static(__dirname + '/public')); 

app.use(express.static('./'));
//app.use('/home', express.static('./client/views/home.html'));
app.use('/js', express.static('./client/js/controllers'));
app.use('/images', express.static('./images'));

//mongoose.connect('mongodb://localhost:27017/studybuddy');

//when connection is created, schemas are defined
//and the models are created
mongoose.connection.on('open', function(){
	console.log('DB connection established!');

	var Schema = mongoose.Schema;

	var CardSetSchema = new Schema({
		setIdNum: Number,
		Name : String,
		Category: String,
		numCards : Number,
		Author: String,
		DateCreated: Date
	},
	{collection: 'sets'}
	);
	Sets = mongoose.model('Sets', CardSetSchema);
	
	var CardListSchema = new Schema({
		setIdNum: String,
		cards : [{
			cardId: Number,
			front : String,
			back : String
		}]
	},
	{collection: 'cards'}
	);
	Cards = mongoose.model('Cards', CardListSchema);
	
	console.log('Models Created!');
});

//REST API
/*app.get('/', function (req, res){
	res.sendfile(__dirname + '/client/views/index.html');
});

app.get('/card', function (req, res){
	res.sendfile(__dirname + '/client/views/card.html');
});
app.get('/home', function (req, res){
	res.sendfile(__dirname + '/client/views/home.html');
});

app.get('/signup', function (req, res){
	res.sendfile(__dirname + '/client/views/signUp.html');
}); */


//app.get('/api/flashcard_sets', flashcardsetsController.list);
//app.post('/api/flashcard_sets', flashcardsetsController.create);

app.get('/searchFlashcard/:flashcardsetName', function(req, res) {

	//var searchrequest = {'$regex': req.params.flashcardsetName};
	var searchrequest = {'$regex': new RegExp('^' + req.params.flashcardsetName.toLowerCase(), 'i')};
		//FlashcardSet.find({category: searchrequest},function(err, found) {
    Sets.find({Category: searchrequest},function(err, found) {
			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)
			else
			res.json(found); // return all todos in JSON format
		});
	});	


app.get('/card/:setIdNum', function(req, res) {

	var searchrequest = req.params.setIdNum;
	//console.log(searchrequest);
    Cards.find({setIdNum: searchrequest},function(err, found) {
			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)
			else
			//console.log(res.json);
			res.json(found); // return all cards in JSON format

		});
	});	
//Handle all the http request that come in on port 3000
app.listen(3000, function() {
	console.log('I\'m Listening....');
})