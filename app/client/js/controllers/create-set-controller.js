var app = angular.module('studybuddyApp');

app.controller('create-set-controller', ['$scope', '$resource', '$http', '$location','$routeParams',
	function ($scope, $resource, $http, $location, $routeParams) {

		var id = 3; // Incremented as more cards are added
  
		$scope.cardList={cards:[]};

		$scope.cardsToAdd = [
			{
				cardId: 1,
				front: '',
				back: ''
			},
			{
				cardId: 2,
				front: '',
				back: ''
			},
			{
				cardId: 3,
				front: '',
				back: ''
			}
		];

		$scope.add = function(cardToAdd) {
			var index = $scope.cardsToAdd.indexOf(cardToAdd);
			$scope.cardsToAdd.splice(index, 1);
			$scope.cardList.cards.push(angular.copy(cardToAdd));
		}

		$scope.addNew = function() {
			id++;
			$scope.cardsToAdd.push({
				cardId: id,
				front: '',
				back: ''
			})
		}

		$scope.createSet = function() {
			
			// # Cards
			$scope.set.numCards = $scope.cardList.cards.length;
			
			// # Date created
			var date = new Date();
			var month = date.getUTCMonth() + 1; // months from 1-12
			var day = date.getUTCDate();
			var year = date.getUTCFullYear();
			$scope.set.DateCreated = month + "-" + day + "-" + year;

			// CREATE SET
			$http.post('/createSet', $scope.set).success(function(data) {
				$scope.set.setIdNum = data.setIdNum;
			});

			// CREATE CARDS
			$http.post('/createCards', $scope.cardList).success(function(data) {
				$scope.cardList.setIdNum = data.setIdNum;
			});
		}

		$scope.redirectUserFlashcardsUrl = function() {
			var url = "/mysets";
			$location.path(url);
		}
}]);