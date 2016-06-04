var app = angular.module('studybuddyApp');

app.controller('card-set-controller', ['$rootScope','$scope', '$resource', '$http', '$location','$routeParams',
	function ($rootScope, $scope, $resource, $http, $location, $routeParams) {
		
	$scope.getAllSets = function() {
		var url = "/homeSets";
		console.log(url);
		$http.get(url).success(function(data) {
			$scope.sets = data;
		});
	}
	

	$scope.redirectSearchCardUrl = function(setIdNum) {

		var url = "/card/"+setIdNum;
		$location.path(url);
	}

	$scope.deleteSet = function(setIdNum){
		var url = "/delete/:" + setIdNum;
		$http.delete(url);
	}	

		/*$scope.mysets = function() {
			var url ="/mysets";
			$location.path(url);
		}*/

	$scope.getmysets = function(){
		var my_set_url = "/getmysets";
		$http.get(my_set_url).success(function(data) {
			
			$scope.results = data;
			
			if($scope.results.length == 0)
				window.alert("No flashcard sets found, please create new sets !");
		});
	}

	$scope.modifySet = function(setID){

		var url = "/modifySet/:" + setID;
		$location.path(url);
	}

	$scope.createCardsRedirect = function(){
			var setID = $routeParams.setID;
			var url = '/modifyCards/:' + setID;

			$location.path(url);
		}

}]);
