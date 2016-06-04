var app = angular.module('studybuddyApp');

app.controller('create-set-controller', ['$scope', '$resource', '$http', '$location','$routeParams',
	function ($scope, $resource, $http, $location, $routeParams) {

		
		$scope.initNewSet = function() {
			console.log('new set init');
			var newSet = {};
			newSet.setIdNum = 0;
			newSet.Name = "";
			newSet.Author = "";
			newSet.Category = "";
			newSet.numCards = 3;
			newSet.dateCreated = new Date();
			newSet.email = "";
			$scope.set = newSet;
		}

		$scope.incNumCards = function(){
			$scope.set.numCards++;
		}

		$scope.writeSet = function(name, author, category) {
			console.log($scope.set);
			$http.post('/createSet', $scope.set).success(function(data, status, headers, config) {
				$scope.set.setIdNum = data.setIdNum;
			});
		}

		$scope.initCards = function(){
			console.log('new cards init');

			var newCards = {
				setIdNum: 0,
				cards:[]
			};

			$scope.newCards = newCards;

		}



		$scope.createCards = function(){
			
			var id = 1;

			$scope.newCards.cards.push({
				"cardId" : 1,
				"front" : card1.front,
				"back" : card1.back
			});
			$scope.newCards.cards.push({
				"cardId" : 2,
				"front" : card2.front,
				"back" : card2.back
			});
			$scope.newCards.cards.push({
				"cardId" : 3,
				"front" : card3.front,
				"back" : card3.back
			});

			/*for(var i=0; i<card.length; i=i+2){


				newCards.cards.push({
				"cardId" : id,
				"front" : card[i].front,
				"back" : card[i+1].back
				});

				id++;
			}*/

			

			$scope.newCards = newCards;
			console.log($scope.newCards);
			$http.post('/createset/cards', $scope.newCards).success(function(data, status, headers, config) {
				$scope.newCards.setIdNum = data.setIdNum;
			});
		}

		


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