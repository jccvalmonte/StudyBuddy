var app = angular.module('studybuddyApp');

app.controller('create-set-controller', ['$scope', '$resource', '$http', '$location','$routeParams',
	function ($scope, $resource, $http, $location, $routeParams) {
  
		$scope.cardList={cards:[]};

		$scope.cardsToAdd = [
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

/*		$scope.createCheck = function(event) {

			setCreated=true;
			$scope.createSet;
		}*/

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
			var day = date.getUTCDate();
			var year = date.getUTCFullYear();
			$scope.set.DateCreated = month + "-" + day + "-" + year;

			// Author
			$scope.set.Author = $scope.fbDetails.firstName + " " + $scope.fbDetails.lastName.charAt(0) + ".";

			// Email
			$scope.set.email = $scope.fbDetails.email;
			
			// CREATE SET
			$http.post('/createSet', $scope.set).success(function(data) {
				$scope.set.setIdNum = data.setIdNum;
				$scope.cardList.setIdNum = data.setIdNum;
				console.log("create set output: "+ $scope.set);
			});
		}

		$scope.createCards = function() {
			// Generate card id's
			for (var i = 0; i < $scope.cardList.cards.length; i++)
				$scope.cardList.cards[i].cardId = i+1;

			// CREATE CARDS
			$http.post('/createCards', $scope.cardList).success(function(data) {
				$scope.cardList = data;
				console.log("create cards output: "+ $scope.cardList);
			});

			// Update # cards in set
			$scope.set.numCards = $scope.cardList.cards.length;

			// Update set
			var set_url = "/updateSet/" + $scope.set.setIdNum;
			$http.put(set_url, $scope.set).success(function(data) {
				console.log("set updated: " + $scope.set);
			});
		}

		$scope.redirectUserFlashcardsUrl = function() {
			var url = "/mySets";
			$location.path(url);
		}

		$scope.getFBsessionDetails = function() {
			var fbsessionurl = "/fbsessionurl";
			console.log("fbsessionurl is: "+ fbsessionurl);

			$http.get(fbsessionurl).success(function(data){
				$scope.fbDetails = data[0];
			});
		}
}]);