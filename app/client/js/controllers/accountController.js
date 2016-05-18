var app = angular.module('studybuddyApp');
app.controller('accountController', ['$scope', '$resource', '$http', '$location','$routeParams', 
	function ($scope, $resource, $http, $location, $routeParams ) {

		$scope.loginRedirectUrl = function() {
			//console.log(flashcardsetName);
			var url = "/loginAccountPage/";
			$location.path(url);
			console.log("getAccountfirst:" + url);
		}

		$scope.getAccountResults = function(email,password) {
			$scope.setit = false;
		//	$scope.email = $routeParams.email;
		//	$scope.pswd = $routeParams.password;

	    	var url = "/getAccount/"+ email;
			console.log(" get Account url "+ url);
			//$scope.myVar = false;
				$http.get(url).success(function(data){
				$scope.results = data;

					if($scope.results.length==0){
						window.alert('Not a valid user, Please Try again');
					}
					else{
							console.log("hello dips "+$scope.results);
							
							
									//$scope.setit = !$scope.setit;
								var locationurl = "/getUserFlashcardsets/"+email;	
									$location.path(locationurl);
									
						}
				});
		}

		//gethomepageurl 
$scope.getUsercardsetResults = function() {

		$scope.email = $routeParams.email;

    	var url = "/getUserFlashcardsets/"+ $scope.email;
		console.log(" getUserFlashcardsets url "+ url);

			$http.get(url).success(function(data){
			$scope.userresults = data;
			console.log($scope.userresults);
			
		});
	}
//redirectUserCardUrl

$scope.redirectUserCardUrl = function(setIdNum, name) {

    	var url = "/card/"+setIdNum+ "/"+name;
		console.log(url);
		$location.path(url);
			
	}
	/*	$scope.myflashcardsets = function() {
			console.log("test here I am");
			var url = "/getAccount/"+ email;
				$location.path(url);

			//console.log("getAccountfirst:" + url);
		}*/
}]);