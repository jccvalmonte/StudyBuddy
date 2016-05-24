var app = angular.module('studybuddyApp');

app.controller('card-set-controller', ['$scope', '$resource', '$http', '$location','$routeParams',
	function ($scope, $resource, $http, $location, $routeParams) {
		
		$scope.getAllSets = function() {
			var url = "/homeSets";
			console.log(url);
			$http.get(url).success(function(data) {
				$scope.sets = data;
			});
		}

		$scope.redirectSearchCardUrl = function(setIdNum, name) {
			var url = "/card/"+setIdNum+"/"+name;
			$location.path(url);
		}
}]);