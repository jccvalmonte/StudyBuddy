var app = angular.module('studybuddyApp');

app.controller('card-set-controller', ['$rootScope','$scope', '$resource', '$http', '$location','$routeParams',
	function ($rootScope, $scope, $resource, $http, $location, $routeParams) {
		
		$rootScope.userVar = false;
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

	/*	$scope.showUserButton = function(){
			$scope.userVar = true;
		}*/
}]);