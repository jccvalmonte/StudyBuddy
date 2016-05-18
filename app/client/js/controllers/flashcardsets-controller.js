

var app = angular.module('studybuddyApp');

app.controller('flashcardsetsController', ['$scope', '$resource', '$http', '$location','$routeParams', 
	function ($scope, $resource, $http, $location, $routeParams ) {

	$scope.getFlashcardset = function(flashcardsetName) {
		console.log(flashcardsetName);
		var url = "/searchFlashcard/"+flashcardsetName;
		$location.path(url);
		console.log(url);
	}

	$scope.getcardsetResults = function() {

		$scope.flashcardsetName = $routeParams.flashcardsetName;

    	var url = "/searchFlashcard/"+ $scope.flashcardsetName;
		console.log(" searchFlashcard url "+ url);

			$http.get(url).success(function(data){
			$scope.results = data;
			console.log($scope.results);
			
		});
	}

	$scope.getHomeurl = function() {
		console.log('hello');
		var url = "/home";

		console.log(url);
		$http.get(url);
	}

	$scope.getSignurl = function() {
		var url = "/signup";

		console.log(url);
		$http.get(url);
	}


	$scope.redirectSearchCardUrl = function(setIdNum, name) {
		var url = "/card/"+setIdNum+ "/"+name;
		console.log(url);
		$location.path(url);
	}

}]);

		/*	cardset.$save(function (result){
				$scope.flashcard_sets.push(result);
				$scope.flashcardsetName ='';
			}); */

