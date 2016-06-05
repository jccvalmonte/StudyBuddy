var app = angular.module('studybuddyApp');

app.controller('create-set-controller', ['$scope', '$resource', '$http', '$location','$routeParams',
	function ($scope, $resource, $http, $location, $routeParams) {
  
		$scope.cardList={cards:[]};

		$scope.cardsToAdd = [
			{
				front: '',
				back: ''
			},
			{
				front: '',
				back: ''
			},
			{
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
			$scope.cardsToAdd.push({
				front: '',
				back: ''
			})
		}

		$scope.removeCardToAdd = function(indexToDelete) {
			$scope.cardsToAdd.splice(indexToDelete, 1);
		}

		$scope.removeExistingCard = function(indexToDelete) {
			$scope.cardList.cards.splice(indexToDelete, 1);
		}

		$scope.createSet = function() {
			
			// # Cards
			$scope.set.numCards = $scope.cardList.cards.length;
			
			// Date created
			var date = new Date();
			var month = date.getUTCMonth() + 1; // months from 1-12
			var day = date.getUTCDate() - 1;
			var year = date.getUTCFullYear();
			$scope.set.DateCreated = month + "-" + day + "-" + year;

			// Generate card id's
			for (var i = 0; i < $scope.cardList.cards.length; i++)
				$scope.cardList.cards[i].cardId = i+1;

			// CREATE SET
			$http.post('/createSet', $scope.set).success(function(data) {
				$scope.set.setIdNum = data.setIdNum;
				console.log($scope.set);
			});

			// CREATE CARDS
			$http.post('/createCards', $scope.cardList).success(function(data) {
				$scope.cardList.setIdNum = data.setIdNum;
				console.log($scope.cardList);
			});
		}

		$scope.redirectUserFlashcardsUrl = function() {
			var url = "/mySets";
			$location.path(url);
		}
}]);