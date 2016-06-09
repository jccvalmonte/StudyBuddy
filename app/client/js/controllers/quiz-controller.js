var app = angular.module('studybuddyApp');

app.controller('quiz-controller', ['$scope', '$resource', '$http', '$location','$routeParams', 
	function ($scope, $resource, $http, $location, $routeParams, $mdDialog) {

		$scope.inputs = [];

		$scope.getSetDetails = function() {
			$scope.setIdNum = $routeParams.setIdNum;
			var url = "/setDetails/" + $scope.setIdNum;
			console.log(url);
			$http.get(url).success(function(data) {
				$scope.setDetails = data;
				console.log("set details: " + $scope.setDetails);
			});
		}

		$scope.getQuestions = function() {
			$scope.setIdNum = $routeParams.setIdNum;
			var url = "/quiz/" + $scope.setIdNum;
			console.log(url);
			$http.get(url).success(function(data){
				$scope.questions = data.cards;
			});
		}

		$scope.getStatistics = function() {
			var numCorrect = 0;
			var inputs = $scope.inputs;
			var solutions = $scope.questions;

			for(var i = 0; i < inputs.length; i++) {
				if (inputs[i] == null)
					inputs[i] = '';
				if (solutions[i].back.toUpperCase() === inputs[i].toUpperCase())
					numCorrect++;
			}

			$scope.numAnsweredCorrect = numCorrect;

			$scope.percentage=Math.round(numCorrect/(solutions.length)*100);

			$scope.grade=calculateGrade($scope.percentage);
		}

		function calculateGrade(value) {
			if (value <= 100 && value >= 93) {
				return "A";
			} else if (value <= 92 && value >= 90) {
				return "A-";
			} else if (value <= 89 && value >= 87) {
				return "B+";
			} else if (value <= 86 && value >= 83) {
				return "B";
			} else if (value <= 82 && value >= 80) {
				return "B-";
			} else if (value <= 79 && value >= 77) {
				return "C+";
			} else if (value <= 76 && value >= 73) {
				return "C";
			} else if (value <= 72 && value >= 70) {
				return "C-";
			} else if (value <= 69 && value >= 67) {
				return "D+";
			} else if (value <= 66 && value >= 63) {
				return "D";
			} else if (value <= 62 && value >= 60) {
				return "D-";
			} else
				return "F";
		}

		$scope.redirectCardUrl = function() {
			var url = "/card/"+$routeParams.setIdNum;
			$location.path(url);
		}
}]);