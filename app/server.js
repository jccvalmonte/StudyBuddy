var express           		= require ('express'),
	app    			 		= express(),
	bodyParser              = require('body-parser'),
	mongoose                = require('mongoose'),
	url 					= require('url');

//initializing mongoose connection to the MongoDB database
//route to database held in 'db.config'
var mongoDBConnection = require('./db.config');
mongoose.connect(mongoDBConnection.uri);
console.log(mongoDBConnection.uri);

//global variables to access the schema models
var Sets;
var Cards;

var idGen = 5;

app.use(bodyParser());
app.use(express.static('./'));
//app.use('/home', express.static('./client/views/home.html'));
app.use('/js', express.static('./client/js/controllers'));
app.use('/images', express.static('./images'));

//mongoose.connect('mongodb://localhost:27017/studybuddy');

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

	var AccountSchema = new Schema({
		email: String,
		firstName: String,
		lastName: String,
		password: String
	},
	{collection: 'accounts'}
	);
	Accounts = mongoose.model('Accounts', AccountSchema);
	
	console.log('Models Created!');
});



//REST API
/*app.get('/', function (req, res){
	res.sendfile(__dirname + '/client/views/index.html');
});
app.get('/card', function (req, res){
	res.sendfile(__dirname + '/client/views/card.html');
});

app.get('/signup', function (req, res){
	res.sendfile(__dirname + '/client/views/signUp.html');
}); */


//app.get('/api/flashcard_sets', flashcardsetsController.list);
//app.post('/api/flashcard_sets', flashcardsetsController.create);

app.get('/home', function (req, res){
	res.sendfile(__dirname + '/home.html');
	/*Sets.find({}, function(err, found) {
		if(err)
			res.send(err);
		else
			res.json(found);
	});*/
});

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


//"/getAccount/"+ $scope.email + $scope.pswd; /getUserFlashcardsets/

app.get('/getAccount/:email/:password', function(req, res) {

	var email = req.params.email;
	var password = req.params.password;

	Accounts.find({email: email}, {password: password}, function(err, found) {
     	// if there is an error retrieving, send the error. nothing after res.send(err) will execute
     	if (err)
     		res.send(err)
     	else
        //console.log(res.json);
        res.json(found); // return all accounts in JSON format
    });
});          

app.post('/createAccount/:email/:firstName/:lastName/:password', function(req, res) {

	var email = req.params.email;
	var firstName = req.params.firstName;
	var lastName = req.params.lastName;
	var password = req.params.password;

	Accounts.create({email: email, firstName: firstName, lastName: lastName, password: password}, function(err, found) {
    	// if there is an error retrieving, send the error. nothing after res.send(err) will execute
     	if (err)
     		res.send(err)
     	else
        //console.log(res.json);
        res.json(found); // return all accounts in JSON format
    });
});                 


app.get('/getUserFlashcardsets/:email', function(req, res) {
 
    var email = req.params.email;
    //var password = req.params.pswd;
 
    Sets.find({useremail: email}, function(err, found) {
			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err)
            else
            res.json(found); // return all accounts in JSON format
        });
    }); 

app.post('/createSet', function(req, res){
	var jsonObj = req.body;
	jsonObj.setIdNum = idGen;
	console.log(jsonObj);
	Sets.create([jsonObj], function(err){
		if(err)
			res.send(err)
	});
	res.send(jsonObj);
	idGen++;
});


app.listen(3000, function() {
	console.log('Server listening on port 3000...');
})
