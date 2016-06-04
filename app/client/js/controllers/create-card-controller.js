var app = angular.module('studybuddyApp');

app.controller('cardCRUDcontroller', ['$scope', '$resource', '$http', '$location','$routeParams',
	function ($scope, $resource, $http, $location, $routeParams) {

		$scope.newCard = {
			cardId: 0,
			front: "",
			back: ""
		}

		$scope.getCards = funtion(){
			$scope.setIdNum = $routeParams.setID;

			var url = "/card/" + $scope.setIdNum;
			console.log(url);

			$http.get(url).success(function(data){
				$scope.Cards = data;
				
				console.log("result cards: " + $scope.Cards);	
			});
		}

		$scope.addCard = function(){
			console.log($scope.newCard);
			http.post()
		}

}]);