var app = angular.module('studybuddyApp');

app.controller('card-controller', ['$scope', '$resource', '$http', '$location','$routeParams', 
	function ($scope, $resource, $http, $location, $routeParams, $mdDialog) {

		$scope.getSetDetails = function() {
			$scope.setIdNum = $routeParams.setIdNum;

			var url = "/setDetails/" + $scope.setIdNum;
			console.log(url);
			$http.get(url).success(function(data) {
				$scope.setDetails = data;
				$scope.getRelatedSets($scope.setDetails.Category);

				console.log("set details: " + $scope.setDetails);
			});


		}

		$scope.getcardResults = function() {
			$scope.setIdNum = $routeParams.setIdNum;

	    	var url = "/card/" + $scope.setIdNum;
			console.log(url);

			$http.get(url).success(function(data){
				var i = 0;
				$scope.i = i;
				$scope.resultCards = data;
				
				console.log("result cards: " + $scope.resultCards);	
			});
		}

		$scope.updateCount = function() {
			var len = $scope.resultCards.cards.length;
			if ($scope.i < len-1) {
				$scope.i = $scope.i + 1;
			}
		}

		$scope.reduceCount = function() {
			if ($scope.i > 0) {
				$scope.i = $scope.i - 1;
			}
		}

		$scope.redirectQuizUrl = function() {
			var url = "/quiz/" + $scope.setIdNum;
			$location.path(url);
		}

		$scope.getRelatedSets = function(category) {
			var url = "/relatedSets/" + category;
			console.log(url);
			$http.get(url).success(function(data){
				$scope.relatedSets = data;
			});
		}

		$scope.redirectRelatedSetUrl = function(setIdNum) {
			var url = "/card/" + setIdNum;
			$location.path(url);
		}
}]);