var express           		= require ('express'),
	passport                = require('passport'),
	app    			 		= express(),
	bodyParser              = require('body-parser'),
	mongoose                = require('mongoose'),
	url 					= require('url'),
	cookieParser			= require('cookie-parser'),
	http 					= require("http"),
	uriUtil					= require("mongodb-uri"),
	util 					= require('util'),
	morgan 					= require('morgan'),
	methodOverride 			= require('method-override'),
	session 				= require('express-session'),
	MongoStore 				= require('connect-mongo')(session),
	crypto 					= require('crypto'),
	LocalStrategy 			= require('passport-local').Strategy,
	FacebookStrategy        = require('passport-facebook').Strategy;

var FACEBOOK_APP_ID = "1754049368215587";
var FACEBOOK_APP_SECRET = "1bcb148cf8e0867484a4ab2eab76a864"

passport.serializeUser(function(user, done){
		done(null, user);
	});

	passport.deserializeUser(function(id, done){
		Accounts.findById(id, function(err, user){
			done(err, user);
		});
	});

passport.use(new FacebookStrategy({
	    clientID: FACEBOOK_APP_ID,
	    clientSecret: FACEBOOK_APP_SECRET,
	    callbackURL: "http://localhost:8080/index.html"
	  },
	  function(accessToken, refreshToken, profile, done) {
	    	process.nextTick(function(){
	    		Accounts.findOne({'facebook.id': profile.id}, function(err, user){
	    			if(err)
	    				return done(err);
	    			if(user)
	    				return done(null, user);
	    			else {
	    				var newUser = new User();
	    				$scope.newUser.facebook.id = profile.id;
	    				$scope.newUser.facebook.token = accessToken;
	    				$scope.newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
	    				$scope.newUser.facebook.email = profile.emails[0].value;

	    				newUser.save(function(err){
	    					if(err)
	    						throw err;
	    					return done(null, newUser);
	    				})
	    				console.log(profile);
	    			}
	    		});
	    	});
	    }
	));

//global variables to access the schema models
var Sets;
var Cards;

/*const hmac = crypto.createHmac('sha256', 'a secret');
console.log("hash is"+ hmac);*/

//initializing mongoose connection to the MongoDB database
//route to database held in 'db.config'

//put config url behind file to hide passwords and username
var mongoDBConnection = require('./db.config');
mongoose.connect(mongoDBConnection.uri);
console.log(mongoDBConnection.uri);

var mongooseUri = uriUtil.formatMongoose(mongoDBConnection.uri);
console.log("mongooseDB URI:" + mongooseUri);

var idGen = 5;

app.set('port', process.env.PORT || 8080); //3000);
app.use(morgan('combined'));
//app.use(bodyParser());
app.use(bodyParser.urlencoded({extend: false}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.Router());

//app.use('/js', express.static('./client/js/controllers'));
//app.use('/images', express.static('./images'));

// create application/json parser
var jsonParser = bodyParser.json();
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } } }; 
mongoose.createConnection(mongooseUri, options);

/*app.use(session({ 
		secret: 'keyboard cat',
		store: new MongoStore({ 
			mongooseConnection: mongoose.connection,
			collection: 'sessions'
		})
}));*/


console.log('Sending connecting request with Mongo db');
mongoose.connection.on('error', function() {
	console.log("problems connecting to the MongoDB server");
});

mongoose.connection.on('open', function(){
	console.log("After connecting to Mongo");

	var Schema = mongoose.Schema;

	var AccountSchema = new Schema({

	local:	{
			email: String,
			firstName: String,
			lastName: String,
			dob: String,
		//password: String,
			username: String,
			hashed_pwd: String
	},
	facebook: {
			id: String,
			token: String,
			email: String,
			name: String
	}
	},
	{collection: 'accounts'}
	);

	app.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email']}));

	/*app.get('/auth/facebook/callback', 
	  passport.authenticate('facebook', { successRedirect: '/client/views/homesearch.html',
	                                      failureRedirect: '/client/views/login.html' })); */
	app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });                                      

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

	/*AccountSchema.methods.generateHash = function(password){
		return bcrypt.hashSync(password, bcrypt.genSaltSync(9));		
	}

	AccountSchema.methods.validPassword = function(password){
	return bcrypt.compareSync(password, this.local.password);
	}
	*/

	Accounts = mongoose.model('Accounts', AccountSchema);

	var CardSetSchema = new Schema({
		setIdNum: Number,
		Name : String,
		Category: String,
		numCards : Number,
		Author: String,
		DateCreated: Date,
		email: String
	},
	{collection: 'sets'}
	);
	Sets = mongoose.model('Sets', CardSetSchema);
	
	var CardListSchema = new Schema({
		setIdNum: String,
		Author: String,
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

function displayDBError(err){
	if (err) { 
		console.log("error 1: " + err);
		for (p in err) {
			console.log(p + ":" + err[p]);
		}
	}
	else {
		console.log("no errors querying the db");
	}
}


function retrieveUserIdWithPwd(req, res, query) {
	console.log("calling retrieve user Id");
	var query = Accounts.findOne(query);
	query.exec(function (err, user) {
		if (!user) {
			req.session.user = undefined;
			res.sendStatus(404);
			return;
		}
		else {
			//req.session.regenerate(function(){
				var pwd = req.query.password;
				console.log("pwd is: "+ pwd);

			//	var hashedPwd = crypto.createHash('sha256').update(pwd).digest('base64').toString();
				
				/*if (hashedPwd === user.hashed_pwd) {
				req.session.user = user.id.valueOf();
				req.session.username = user.username;
				req.session.email = user.email;
				console.log('user information is correct');
			}
			else {
				console.log('incorrect password');
			}*/
			
		}
		if (err) {
			console.log("errors accessing users");
		}
		else {
			console.log("----------->user info:" + user);
			res.sendStatus(200);
			//res.json(req.session.user);
		}
	});	
}

/*app.get('/', function(req, res){
  res.render('index', { user: req.user });
}); */



app.get('/app/login/', function (req, res) {
	console.log("making a login request to server via form");
	console.log(req);
	var id = req.query.username;
	console.log("id is:"+ id);
	retrieveUserIdWithPwd(req, res, {username: id});
});

function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()){
		return next();
	}

	res.redirect('/login');
}

console.log("before defining app static route");
app.use(express.static('./'));


app.get('/checklogin/:username', function(req, res) {
	console.log("making a login request to server");
	//console.log(req);
	var id = req.params.username;

	retrieveUserIdWithPwd(req, res, {username: id});

}); 

app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/allusers',
		failureRedirect: '/login',
		//failureFlash: true
	}));

app.get('/allusers', function(re, res){

	Sets.find({}, function(err, found){
		if(err)
			res.send(err);
		else
			res.json(found);
		console.log(found);
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

app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/',
		failureRedirect: '/signup',
		failureFlash: true
	}));  

app.get('/homeSets', function(req, res){
	
	
	Sets.find({}, function(err, found){
		if(err)
			res.send(err);
		else
			res.json(found);
	});
});

app.get('/relatedSets/:category', function(req, res) {

	var searchrequest = req.params.category;
	
	Sets.find({Category: searchrequest}, function(err, found){
		if(err)
			res.send(err);
		else
			res.json(found);
	});
});

app.get('/setDet/:setIdNum', function(req, res) {

	var searchrequest = req.params.setIdNum;

	Sets.find({setIdNum: searchrequest}, function(err, found) {
		if(err)
			res.send(err);
		else
			res.json(found);
	});
});

app.get('/card/:setIdNum', function(req, res) {

	var searchrequest = req.params.setIdNum;
	console.log(searchrequest);
	Cards.find({setIdNum: searchrequest},function(err, found) {

		// if there is an error retrieving, send the error. nothing after res.send(err) will execute
		if (err)
			res.send(err);
		else
		//console.log(res.json);
		res.json(found); // return all cards in JSON format
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
	
	/*Sets.create(jsonObj, function(err){
		if(err)
			res.send(err)
	});
	res.send(jsonObj);
	idGen++;*/
});

app.post('/createset/cards', function(req,res){
	var jsonObj = req.body;
	jsonObj.setIdNum = idGen;
	console.log(jsonObj);

})

app.delete('userSets/delete/:setId', function(req,res){
	Sets.findOneAndRemove({setIdNum: req.params.setId}, 
		function(err,set){
			if (err){
				res.send(err);
			}
			else{
				console.log("set deleted!");
				res.send(set);
			}

		});
});

var port = process.env.port || 3000;


/*app.listen(3000, function() {
	console.log('Server listening on port 3000...');
})*/
http.createServer(app).listen(app.get('port'), function(){
	console.log("Express server listening on port " + app.get('port'));
});	
console.log("after callintg http: createServer");
