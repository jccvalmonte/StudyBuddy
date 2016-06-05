var app = angular.module('studybuddyApp');

app.controller('modify-set-controller', ['$scope', '$resource', '$http', '$location','$routeParams',
	function ($scope, $resource, $http, $location, $routeParams) {

		$scope.cardsToAdd = [];

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

		$scope.getCards = function() {
			var url = "/card/" + $routeParams.setIdNum;
			console.log(url);
			$http.get(url).success(function(data) {
				$scope.cardList = data;
			});
		}

		$scope.getSetDetails = function() {
			$scope.setIdNum = $routeParams.setIdNum;

			var url = "/setDetails/" + $scope.setIdNum;
			console.log(url);
			$http.get(url).success(function(data) {
				$scope.setDetails = data;
			});
		}

		$scope.submitModifiedSet = function() {
			// Update # cards
			$scope.setDetails.numCards = $scope.cardList.cards.length;

			// Generate card id's
			for (var i = 0; i < $scope.cardList.cards.length; i++)
				$scope.cardList.cards[i].cardId = i+1;

		}

		$scope.redirectUserFlashcardsUrl = function() {
			var url = "/mySets";
			$location.path(url);
		}

}]);