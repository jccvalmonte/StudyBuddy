var app = angular.module('studybuddyApp');

app.controller('crud-set-controller', ['$scope', '$resource', '$http', '$location','$routeParams',
	function ($scope, $resource, $http, $location, $routeParams) {

		$scope.initNewSet = function() {
			console.log('new set init');
			var newSet = {};
			newSet.setIdNum = 0;
			newSet.Name = "lalala";
			newSet.Author = "Chris";
			newSet.Category = "test";
			newSet.numCards = 0;
			newSet.dateCreated = new Date();
			$scope.set = newSet;
		}

		$scope.writeSet = function() {
			console.log($scope.set);
			$http.post('/createSet', $scope.set).success(function(data, status, headers, config) {
				$scope.set.setIdNum = data.setIdNum;
			});
		}
}]);