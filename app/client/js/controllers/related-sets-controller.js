var app = angular.module('studybuddyApp');

app.controller('card-set-controller', ['$scope', '$resource', '$http', '$location','$routeParams',
	function ($scope, $resource, $http, $location, $routeParams) {
		
		$scope.getRelatedSets = function() {
			var url = "/relatedSets";
			console.log(url);
			$http.get(url).success(function(data){
				$scope.sets = data;
			});
		}
}]);