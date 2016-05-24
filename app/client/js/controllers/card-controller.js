var app = angular.module('studybuddyApp');
app.controller('card-controller', ['$scope', '$resource', '$http', '$location','$routeParams', 
	function ($scope, $resource, $http, $location, $routeParams, $mdDialog) {

		$scope.getcardResults = function() {
			$scope.setIdNum = $routeParams.setIdNum;

	    	var url = "/card/" + $scope.setIdNum;
			console.log(" cards url " + url);

			$http.get(url).success(function(data){
				var i = 0;
				$scope.i = i;
				$scope.resultCards = data[0];
				console.log("resultcards: " + $scope.resultCards);	
			});
		}

		$scope.getSetDetails = function () {
			var url = "/setDetails";
			console.log(url);
			$http.get(url).success(function(data) {
				$scope.setDetails = data;
			});
		}

		$scope.getRelatedSets = function() {
			var url = "/relatedSets";
			console.log(url);
			$http.get(url).success(function(data){
				$scope.relatedSets = data;
			});
		}

		$scope.updateCount = function () {
			var len = $scope.resultCards.cards.length;
			if ($scope.i < len-1) {
				$scope.i = $scope.i + 1;
			}
		}

		$scope.reduceCount = function () {
			var len = $scope.resultCards.cards.length;
			if ($scope.i > 0) {
				$scope.i = $scope.i - 1;
			}
		}

	}]);
