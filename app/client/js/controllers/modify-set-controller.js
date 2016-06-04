angular.module('studybuddyApp')
.controller('modset-controller', ['$scope', '$resource', '$http', '$location','$routeParams',
	function ($scope, $resource, $http, $location, $routeParams) {

		$scope.createCardsRedirect = function(){
			var setID = $routeParams.setID;
			var url = '/modifyCards/:' + setID;

			$location.path(url);
		}
}]);