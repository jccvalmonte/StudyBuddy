 var express = require('express');
 var app = express(); 

 app.use(express.static(__dirname + "/ui"));

 app.listen(8080);
 console.log("Server listening on port 8080");