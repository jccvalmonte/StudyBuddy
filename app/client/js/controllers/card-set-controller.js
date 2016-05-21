var app = angular.module('studybuddyApp');

app.controller('card-set-controller', ['$scope', '$resource', '$http', '$location','$routeParams',
	function ($scope, $resource, $http, $location, $routeParams) {

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
	
	$scope.getAllSets = function() {
		var url = "/homeSets";
		console.log(url);
		$http.get(url).success(function(data){
			$scope.sets = data;
		});
	}

	$scope.getHomeUrl = function() {
		var url = "/home";
		console.log(url);
		$location.path(url);
	}

	$scope.getSignurl = function() {
		var url = "/signup";

		console.log(url);
		$http.get(url);
	}


	$scope.redirectSearchCardUrl = function(setIdNum, name) {
		var url = "/card/"+setIdNum+ "/"+name;
		$scope.hideVar = true;
		$location.path(url);
	}

	$scope.writeSet = function() {
			console.log($scope.set);
			$http.post('/createSet', $scope.set).success(function(data, status, headers, config) {
				$scope.set.setIdNum = data.setIdNum;
			});
	}
	
	$scope.initNewSet = function() {
		console.log('new set init');
		var newSet = {};
		newSet.setIdNum = 0;
		newSet.Name = "testing";
		newSet.Author = "Anthony";
		newSet.Category = "test";
		newSet.numCards = 0;
		newSet.dateCreated = new Date();
		$scope.set = newSet;
	}

}]);