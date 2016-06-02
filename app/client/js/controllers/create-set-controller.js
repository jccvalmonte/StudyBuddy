var app = angular.module('studybuddyApp');

app.controller('create-set-controller', ['$scope', '$resource', '$http', '$location','$routeParams',
	function ($scope, $resource, $http, $location, $routeParams) {

		var id = 3; // Incremented as more cards are added
  
		$scope.set={cards:[]};

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
			$scope.set.cards.push(angular.copy(cardToAdd));
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
			newSet = $scope.set;

			console.log(newSet);

			$http.post('/createset', newSet).success(function(data) {
				newSet.setIdNum = data.setIdNum;
			});
		}

		$scope.redirectUserSetsUrl = function() {
			var url = "/mysets";
			$location.path(url);
		}
}]);