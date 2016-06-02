var app = angular.module('studybuddyApp');

app.controller('create-set-controller', ['$scope', '$resource', '$http', '$location','$routeParams',
	function ($scope, $resource, $http, $location, $routeParams) {

		$scope.writeSet = function(name, author, category) {
			console.log($scope.set);
			$http.post('/createSet', $scope.set).success(function(data, status, headers, config) {
				$scope.set.setIdNum = data.setIdNum;
			});
		}

		$scope.initCards = function(front1, front2, front3, back1, back2, back3){
			console.log('new cards init');

			var newCards = {
				setIdNum: 0,
				cards:[]
			};

			newCards.cards.push({
				"cardId" : 1,
				"front" : front1,
				"back" : back1
			});
			newCards.cards.push({
				"cardId" : 2,
				"front" : front2,
				"back" : back2
			});
			newCards.cards.push({
				"cardId" : 3,
				"front" : front3,
				"back" : back3
			});

			/*for(var i=0; i<3; i++){
				var id = i+1;

				newCards.cards.push({
				"cardId" : id,
				"front" : "blank front",
				"back" : "blank back"
			});*/
				

			

			$scope.newCards = newCards;
			console.log($scope.newCards);
			$http.post('/createset/cards', $scope.newCards).success(function(data, status, headers, config) {
				$scope.newCards.setIdNum = data.setIdNum;
			});
		}

		/*$scope.writeCards = function(front1, front2, front3, back1, back2, back3){
			$scope.newCards.cards[0].front = front1;
			$scope.newCards.cards[0].back = back1;
			$scope.newCards.cards[1].front = front2;
			$scope.newCards.cards[1].back = back2;
			$scope.newCards.cards[2].front = front3;
			$scope.newCards.cards[2].back = back3;
			console.log($scope.cards);
			$http.post('/createset/cards', $scope.cards).success(function(data, status, headers, config) {
				$scope.cards.setIdNum = data.setIdNum;
			});

		}*/


/*
		$scope.set = { cards: [] };

		$scope.addCard = function() {
			var br = document.createElement('br');
			$scope.set.cards.push("");
		}

		$scope.submitSet = function() {
			console.log($scope.set);
		}*/

}]);