var app = angular.module('studybuddyApp');

app.controller('card-set-controller', ['$rootScope','$scope', '$resource', '$http', '$location','$routeParams',
	function ($rootScope, $scope, $resource, $http, $location, $routeParams) {
		
	$scope.getAllSets = function() {
		var url = "/homeSets";
		console.log(url);
		$http.get(url).success(function(data) {
			$scope.sets = data;
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
		newSet.useremail = "";
		$scope.set = newSet;
	}
		/*	cardset.$save(function (result){
				$scope.flashcard_sets.push(result);
				$scope.flashcardsetName ='';
			}); */

	$scope.redirectSearchCardUrl = function(setIdNum) {

		var url = "/card/" + setIdNum;
		$location.path(url);
	}	


}]);
