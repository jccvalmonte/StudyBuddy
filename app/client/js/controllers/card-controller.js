
var app = angular.module('studybuddyApp');
app.controller('card-controller', ['$scope', '$resource', '$http', '$location','$routeParams', 
	function ($scope, $resource, $http, $location, $routeParams, $mdDialog) {

		 $scope.getcardResults = function() {
			$scope.setIdNum = $routeParams.setIdNum;
			
	    	var url = "/card/" + $scope.setIdNum;
			console.log(" cards url " + url);

				$http.get(url).success(function(data){
					var i=0;
					$scope.i = i;
					//$scope.hideVar= false;
				$scope.resultCards = data[0];
				console.log("resultcards: " + $scope.resultCards);
				
			});
		}

		// Used name as route parameter to alert user about flashcardset name

		$scope.updateCount = function () {
			var len = $scope.resultCards.cards.length;
			if($scope.i < len-1){
			$scope.i = $scope.i + 1;
			}
			else
			{
				$scope.endofcards = $routeParams.name;

				window.alert("Done viewing all flashcards for " + $scope.endofcards);
				
			}
		}

		$scope.reduceCount = function () {
			var len = $scope.resultCards.cards.length;
			if($scope.i > 0){
			$scope.i = $scope.i - 1;
			}
			else
			{

				$scope.firstcard = $routeParams.name;

				window.alert("This is the First Card for " + $scope.firstcard + " flashcard set");
				
			}
		}

	}]);

		/*	cardset.$save(function (result){
				$scope.flashcard_sets.push(result);
				$scope.flashcardsetName ='';
			}); */







