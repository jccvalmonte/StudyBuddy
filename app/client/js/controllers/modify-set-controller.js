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

			// Update date created
			var date = new Date();
			var month = date.getUTCMonth() + 1; // months from 1-12
			var day = date.getUTCDate() - 1;
			var year = date.getUTCFullYear();
			$scope.setDetails.DateCreated = month + "-" + day + "-" + year;

			// Generate card id's
			for (var i = 0; i < $scope.cardList.cards.length; i++)
				$scope.cardList.cards[i].cardId = i+1;

			// UPDATE SET


			// UPDATE CARDS




/*

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

*/
		}

		$scope.redirectUserFlashcardsUrl = function() {
			var url = "/mySets";
			$location.path(url);
		}

}]);