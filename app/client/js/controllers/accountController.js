var app = angular.module('studybuddyApp');
app.controller('accountController', ['$scope', '$resource', '$http', '$location','$routeParams', 
	function ($scope, $resource, $http, $location, $routeParams ) {

	/*	$scope.getAccount = function(email, password) {
			//console.log(flashcardsetName);
			var url = "/getAccount/"+email;
			$location.path(url);
			console.log("getAccountfirst:" + url);
		}*/

		$scope.getAccountResults = function(email,password) {

		//	$scope.email = $routeParams.email;
		//	$scope.pswd = $routeParams.password;

	    	var url = "/getAccount/"+ email;
			console.log(" get Account url "+ url);

				$http.get(url).success(function(data){
				$scope.results = data;
					if($scope.results.length==0){
						window.alert('Not a valid user, Please Try again');
					}
					else{
						window.location.href = 'myFlashcards.html';
					}

				console.log("test "+$scope.results);
			});
		}
}]);