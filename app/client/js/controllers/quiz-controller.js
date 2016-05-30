var app = angular.module('studybuddyApp');

app.controller('quiz-controller', ['$scope', '$resource', '$http', '$location','$routeParams', 
	function ($scope, $resource, $http, $location, $routeParams, $mdDialog) {

		$scope.getSetDetails = function() {
			$scope.setIdNum = $routeParams.setIdNum;

			var url = "/setDetails/" + $scope.setIdNum;
			console.log(url);
			
			$http.get(url).success(function(data) {
				$scope.setDetails = data[0];
			});
		}

		$scope.getQuizQuestions = function() {
			$scope.setIdNum = $routeParams.setIdNum;

	    	var url = "/quiz/" + $scope.setIdNum;
			console.log(url);

			$http.get(url).success(function(data){
				$scope.questions = data;
				console.log("questions: " + $scope.questions);	
			});
		}
}]);