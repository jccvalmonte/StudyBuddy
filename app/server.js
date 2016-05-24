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

//mongoose.connect('mongodb://anthony:absher@ds036069.mlab.com:36069/studybuddy');

//global variables to access the schema models
var Sets;
var Cards;

var idGen = 5;

app.use(bodyParser());
app.use(express.static('./'));
app.use('/js', express.static('./client/js/controllers'));
app.use('/images', express.static('./images'));

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
		password: String,
		username: String,
		dob: String
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
});

app.get('/home', function (req, res){
	res.sendfile(__dirname + '/home.html');
});

*/


//app.get('/api/flashcard_sets', flashcardsetsController.list);
//app.post('/api/flashcard_sets', flashcardsetsController.create);

app.get('/homeSets', function(req,res){
	
	Sets.find({}, function(err,found){
		if(err)
			res.send(err);
		else
			res.json(found);
	});
});

app.get('/relatedSets', function(req,res) {
	
	Sets.find({}, function(err,found){
		if(err)
			res.send(err);
		else
			res.json(found);
	});
});

app.get('/card/:setIdNum', function(req, res) {

	var searchrequest = req.params.setIdNum;
	//console.log(searchrequest);
	Cards.find({setIdNum: searchrequest},function(err, found) {
		// if there is an error retrieving, send the error. nothing after res.send(err) will execute
		if (err)
			res.send(err);
		else
		//console.log(res.json);
		res.json(found); // return all cards in JSON format
	});
});	

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

app.post('/signup', function(req, res) {

	var jsonObj= req.body;
	console.log(jsonObj);

	Accounts.create(jsonObj, function(err, found){
		if (err)
     		res.send(err)
     	else
        //console.log(res.json);
       // res.json(found); // return all accounts in JSON format
        console.log("Res is"+res.json(found));
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
	Sets.create({jsonObj}, function(err){
		if(err)
			res.send(err)
	});
	res.send(jsonObj);
	idGen++;
});


app.listen(3000, function() {
	console.log('Server listening on port 3000...');
})