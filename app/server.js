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
	FacebookStrategy        = require('passport-facebook').Strategy,
	cors                    = require('cors');

app.use(cors());

/*var whitelist = ('http://localhost:8080');
var corsOptionsDelegate = function(req, callback){
  var corsOptions;
  if(whitelist.indexOf(req.header('Origin')) !== -1){
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response 
  }else{
    corsOptions = { origin: false }; // disable CORS for this request 
  }
  callback(null, corsOptions); // callback expects two parameters: error and options 
};
var corsOptions = {
  allowedHeaders: "X-Key, X-Singature, Content-Type",
  origin: true
};*/

console.log("before defining app static route");
app.use(express.static('./'));

app.use(morgan('combined'));
app.use(bodyParser());
app.use(bodyParser.urlencoded({extend: false}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(session({ secret: 'keyboard cat', 
	store: new MongoStore({ 
			mongooseConnection: mongoose.connection,
			collection: 'sessions'
		}) 
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.Router());


app.set('port', process.env.PORT || 8080); //3000);

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
    callbackURL: "http://localhost:8080/auth/facebook/callback",
    profileFields: ['email', 'name']
  },
  function(accessToken, refreshToken, profile, done) {
    	process.nextTick(function(){
    		Accounts.findOne({email: profile.emails[0].value}, function(err, user){
    			if(err)
    				return done(err);
    			if(user)
    				{
    				console.log("found user is: "+ user);
    				
    				return done(null, user);

    				}
    			else {
    				var newUser = new Accounts();
    				//newUser.facebookid = profile.id;

    				newUser.facebooktoken = accessToken;
    				newUser.firstName = profile.name.givenName;
    				console.log("newUser.firstName "+ newUser.firstName);
            		newUser.lastName  = profile.name.familyName;
            		//newUser.dob = profile.birthday;
    				console.log("test1 here pls first.. 1 ..");
    				newUser.email = profile.emails[0].value;
    				//newUser.facebook.photo = 'https://graph.facebook.com/v2.3/' + profile.id + '/picture?type=large';

    				newUser.save(function(err){
    					if(err){
    						throw err;
    					}
    					console.log("newuser is: "+ newUser);
    					return done(null, newUser);
    				})
    				console.log("profile is: "+ profile);
    			}
    		});
    	});
    }
));

app.get('/auth/facebook', passport.authenticate("facebook", {scope: ['email']}),
	function(req,res){

	});

app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/client/views/login.html' }),
	function(req, res){
		console.log("auth newuser is: "+ req.user.email);
		console.log("req.session.passport.user: "+ req.session.passport.user._id);

		console.log("is auth: ? "+ req.isAuthenticated());
		/*if(req.isAuthenticated()){
			var isloogedin = true;
		}*/
		res.redirect('http://localhost:8080/#/mySets');

		//res.json(newUser.email);
		//res.json(newUser);
});

app.get('/fbsessionurl', function(req, res){
	console.log("Inside server side fb session call url !!!");

	Accounts.find({_id: req.session.passport.user._id}, function(err, found){
		if(err)
			res.send(err);
		else
			res.json(found);
	});
});

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');

});

app.get('/getmysets', function(req,res){
	console.log("Before getmysets:" + req.isAuthenticated());
	//console.log("jsom email val: "+ req.profile.emails[0].value);

	if(req.isAuthenticated()){
		console.log("After getmysets:" + req.isAuthenticated());

		if(req.user.email !=null){
			var user_email = req.user.email;
			Sets.find({email: user_email}, function(err, found) {
		        if (err)
		            res.send(err)
		        else
		            res.json(found);
		        });
		}
	} else {
		console.log("redirecting to login page");
		res.redirect("/");
		//res.redirect("./#/login.html");
	}
})

//global variables to access the schema models
var Sets;
var Cards;

//initializing mongoose connection to the MongoDB database
//route to database held in 'db.config'

//put config url behind file to hide passwords and username
var mongoDBConnection = require('./db.config');
mongoose.connect(mongoDBConnection.uri);
console.log(mongoDBConnection.uri);

var mongooseUri = uriUtil.formatMongoose(mongoDBConnection.uri);
console.log("mongooseDB URI:" + mongooseUri);


//app.use('/js', express.static('./client/js/controllers'));
//app.use('/images', express.static('./images'));

// create application/json parser
var jsonParser = bodyParser.json();
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } } }; 
mongoose.createConnection(mongooseUri, options);

console.log('Sending connecting request with Mongo db');
mongoose.connection.on('error', function() {
	console.log("Problem connecting to the MongoDB server.");
});

mongoose.connection.on('open', function(){
	
	console.log("Connection to Mongo established.");
	var Schema = mongoose.Schema;

	var AccountSchema = new Schema({
		email: String,
		firstName: String,
		lastName: String,
		password: String,
		username: String,
		dob: String,
		hashed_pwd: String,
		facebookid: String,
		facebookemail: String,
		facebooktoken: String,
		facebookname: String
	},
	{collection: 'accounts'}
	);	
	Accounts = mongoose.model('Accounts', AccountSchema);

	var CardSetSchema = new Schema({
		setIdNum: String,
		Name: String,
		Category: String,
		numCards: Number,
		Author: String,
		DateCreated: String,
		email: String
		}, {collection: 'sets'}
	);

	Sets = mongoose.model('Sets', CardSetSchema);

	var CardListSchema = new Schema({
		setIdNum: String,
		cards: [{
			cardId: Number,
			front: String,
			back: String
		}]
		}, {collection: 'cards'}
	);
	
	Cards = mongoose.model('Cards', CardListSchema);

		var SessionSchema = new Schema({
		session: {
			cookie: {
				originalMaxAge: String,
				expires: String,
				httpOnly: Boolean,
				path: String
			},
			passport: {
				user: {
					email: String,
					lastName: String,
					firstName: String,
					facebookid: Number
				}
			}
		},
		expires: String
		}, {collection: 'sessions'}
	);
	
	Session = mongoose.model('Session', SessionSchema);
	
	console.log('Models created!');

}); // mongoose connection

function displayDBError(err){
	if (err) { 
		console.log("error 1: " + err);
		for (p in err) {
			console.log(p + ":" + err[p]);
		}
	} else {
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
		} else {

				var userusername = user.username;
				var userpwd = user.password;
				var hashedPwd = crypto.createHash('sha256').update(userpwd).digest('base64').toString();
				console.log("had pwd is: "+hashedPwd);

				if(hashedPwd == user.hashed_pwd){
					req.session.userid = user._id.valueOf();
					console.log("user session is: "+ req.session.userid);
					req.session.username = user.username;
					req.session.email = user.email;
					console.log('user information is correct');
				}
				console.log("dipali username userpass is: "+ userusername + " " + userpwd);
			
		}
		if (err) {
			console.log("errors accessing users");
		} else {
			console.log("----------->user info:" + user);
			var userusername = user.username;
			console.log("else username is: "+ userusername);
			//res.sendStatus(200);
			res.json(req.session.userid);
		}
	});	
}

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

app.get('/checklogin/:username', function(req, res) {
	console.log("making a login request to server");
	//console.log(req);
	var id = req.params.username;

	retrieveUserIdWithPwd(req, res, {username: id});

}); 

app.get('/getUsersets/:userid', function(req, res) {
 
    var useridfield = req.params.userid;
    console.log("useridfield: "+ useridfield);
 
    Sets.find({owner: useridfield}, function(err, found) {
        if (err)
            res.send(err)
        else
            res.json(found);
        });
    }); 

app.post('/signup', function(req, res) {


	var jsonObj= req.body;
	console.log("Hello post Object is"+ jsonObj);

	Accounts.create(jsonObj, function(err, found){
		if (err)
     		res.send(err)
     	else
        //console.log(res.json);
       res.json(found); // return all accounts in JSON format
        console.log("Res is"+res.json(found));
	}); 
}); 

/*app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/',
		failureRedirect: '/signup',
		failureFlash: true
	}));  */

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
		else {
			console.log(found);
			res.json(found);
		}
	});
});

app.get('/setDetails/:setIdNum', function(req, res) {

	var searchrequest = req.params.setIdNum

	Sets.findOne({setIdNum: searchrequest}, function(err, found) {
		if(err)
			res.send(err);
		else
			res.json(found);
	});
});

app.get('/quiz/:setIdNum', function(req, res) {

	var searchrequest = req.params.setIdNum;
	console.log(searchrequest);
	Cards.findOne({setIdNum: searchrequest}, function(err, found) {
		if(err)
			res.send(err);
		else {
			res.json(found);
		}

	});

});

app.get('/card/:setIdNum', function(req, res) {
	var searchrequest = req.params.setIdNum;
	console.log(searchrequest);
	Cards.findOne({setIdNum: searchrequest}, function(err, found) {
		if (err)
			res.send(err);
		else
			res.json(found);
	});
});

var idGen = 4;

app.post('/createSet', function(req, res){
	idGen+=1;
	var jsonObj = req.body;
	jsonObj.setIdNum = idGen;
	console.log(jsonObj);

	Sets.create(jsonObj, function(err, theSet){
		if(err)
			res.send(err)
		else
			res.json(theSet);
	});
});

app.post('/createCards', function(req, res){
	var jsonObj = req.body;
	console.log(jsonObj);

	Cards.create(jsonObj, function(err, theCards){
		if(err)
			res.send(err)
		else
			res.json(theCards);
	});
});

app.delete('/deleteSet/:setIdNum', function(req, res) {
	Sets.findOneAndRemove({setIdNum: req.params.setIdNum}, 
		function(err, set){
			if (err){
				res.send(err);
			} else {
				console.log("set deleted");
			}
	});
});

app.delete('/deleteCards/:setIdNum', function(req, res) {
	Cards.findOneAndRemove({setIdNum: req.params.setIdNum}, 
	function(err, cards){
		if (err){
			res.send(err);
		} else {
			console.log("cards deleted");
		}
	});
});

app.post('/updateSet/:setIdNum', function(req, res) {
	var searchrequest = req.params.setIdNum;
	console.log(searchrequest);
	Sets.findOneAndUpdate({setIdNum: searchrequest}, function(err, found) {
		if (err)
			res.send(err);
		else
			res.json(found);
	});
});

app.post('/updateCards/:setIdNum', function(req, res) {
	var id = req.params.setIdNum;
	console.log(searchrequest);
	Cards.findOneAndUpdate({setIdNum: searchrequest}, function(err, found) {
		if (err)
			res.send(err);
		else
			res.json(found);
	});
});





http.createServer(app).listen(app.get('port'), function(){
	console.log("Express server listening on port " + app.get('port') + "...");
});	
console.log("after calling http: createServer");