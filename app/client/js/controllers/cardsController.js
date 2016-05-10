var app = angular.module('studybuddyApp');
app.controller('cardsController', ['$scope', '$resource', '$http', '$location','$routeParams', 
	function ($scope, $resource, $http, $location, $routeParams ) {

		 $scope.getcardResults = function() {

			$scope.setIdNum = $routeParams.setIdNum;

	    	var url = "/card/"+ $scope.setIdNum;
			console.log(" cards url "+ url);

				$http.get(url).success(function(data){
				$scope.resultCards = data;
				console.log($scope.resultCards);
				//console.log($scope.resultCards[0].settIdNum);
				//$location.path("/card");
				//console.log("Test cards: ", $scope.resultCards);

				//$window.location.href ='/card?$scope.resultCards';
				
			});
		}

	}]);

		/*	cardset.$save(function (result){
				$scope.flashcard_sets.push(result);
				$scope.flashcardsetName ='';
			}); */







