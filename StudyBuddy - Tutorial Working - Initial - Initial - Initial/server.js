/** Data created on: 4/27/2016
This is the 'main' entry point for our Node server, This
is how we will run are Node Application **/

var express           		= require ('express'),
	app    			 		= express(), //for express we have defined a new 'app'
	bodyParser              = require('body-parser'),
	mongoose                = require('mongoose'),
	flashcardsetsController = require('./server/controllers/flashcardset_controller');
//For the above app we need to define some routes
//anyone makes a request to the route directory; 
//respond by sending a file named index.html

mongoose.connect('mongodb://localhost:27017/studybuddy');

app.use(bodyParser());

app.get('/', function (req, res){
	res.sendfile(__dirname + '/client/views/index.html');
});

app.use('/js', express.static(__dirname + '/client/js'));

//REST API
app.get('/api/flashcard_sets', flashcardsetsController.list);
app.post('/api/flashcard_sets', flashcardsetsController.create);

//Handle all the http request that come in on port 3000
app.listen(3000, function() {
	console.log('I\'m Listening....');
})