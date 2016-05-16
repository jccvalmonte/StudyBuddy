var app = angular.module('studybuddyApp');
app.controller('cardsController', ['$scope', '$resource', '$http', '$location','$routeParams', 
	function ($scope, $resource, $http, $location, $routeParams, $mdDialog) {

		 $scope.getcardResults = function() {

			$scope.setIdNum = $routeParams.setIdNum;
	    	var url = "/card/"+ $scope.setIdNum;
			console.log(" cards url "+ url);

				$http.get(url).success(function(data){
					var i=0;
					$scope.i = i;
				$scope.resultCards = data[0];
				console.log("resultcards: " +$scope.resultCards);
				//console.log($scope.resultCards[0].settIdNum);
				//$location.path("/card");
				//console.log("Test cards: ", $scope.resultCards);

				//$window.location.href ='/card?$scope.resultCards';
				
			});
		}

		$scope.updateCount = function () {
			var len = $scope.resultCards.cards.length;
			if($scope.i < len-1){
			$scope.i = $scope.i + 1;
			}
			else
			{
				$scope.endofcards = $routeParams.name;
				window.alert("Done vieiwing all flashcards for "+ $scope.endofcards);
				
			}
		}

		$scope.reduceCount = function () {
			$scope.i = $scope.i - 1;
		}

	}]);

		/*	cardset.$save(function (result){
				$scope.flashcard_sets.push(result);
				$scope.flashcardsetName ='';
			}); */







