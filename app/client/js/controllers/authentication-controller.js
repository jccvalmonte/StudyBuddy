var app = angular.module('studybuddyApp');

var app = function($q, $timeout, $http, $location, $rootScope)
{ // Initialize a new promise 
var deferred = $q.defer(); 
// Make an AJAX call to check if the user is logged in 
$http.get('/loggedin').success(function(user){ 
// Authenticated 
if (user !== '0') 
	deferred.resolve(); 
	// Not Authenticated 
else { $rootScope.message = 'You need to log in.'; 
	   deferred.reject(); 
	   $location.url('/login'); 
	} 
}); 

return deferred.promise; };