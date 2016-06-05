var app = angular.module('studybuddyApp');

app.controller('fb-user-sets-controller', ['$rootScope','$scope', '$resource', '$http', '$location','$routeParams',
	function ($rootScope, $scope, $resource, $http, $location, $routeParams) {

		$scope.getFBsessionDetails = function() {

			var fbsessionurl = "/fbsessionurl";
			console.log("fbsessionurl is: "+fbsessionurl);

			$http.get(fbsessionurl).success(function(data){
				$scope.fbdetails = data[0];
				//var fbdet = JSON.parse($scope.fbdetails);
				console.log("$scope.fbdetails: "+ $scope.fbdetails.email);
			});
		}

		$scope.getmysets = function(){
			var my_set_url = "/getmysets";
			$http.get(my_set_url).success(function(data) {
				
				$scope.sets = data;
				
				//if($scope.results.length == 0)
					//window.alert("No flashcard sets found, please create new sets !");
			});
		}

		$scope.redirectCardUrl = function(setIdNum) {
			var url = "/card/" + setIdNum;
			$location.path(url);
		}

		$scope.redirectModifySetUrl = function(setIdNum){
			var url = "/modifySet/" + setIdNum;
			$location.path(url);
		}

		$scope.deleteSet = function(setIdNum){
			var url = "/deleteSet/" + setIdNum;
			$http.delete(url);
		}

}]);