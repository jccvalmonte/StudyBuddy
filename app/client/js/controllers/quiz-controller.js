var app = angular.module('studybuddyApp');

app.controller('quiz-controller', ['$scope', '$resource', '$http', '$location','$routeParams', 
	function ($scope, $resource, $http, $location, $routeParams, $mdDialog) {

		$scope.answers={};

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
			var numQuestions = $scope.questions.length;

			for(var i = 0; i < numQuestions; i++) {
				if (questions[i].back == questions[i].input)
					numCorrect++;
			}

			$scope.numQuestions = numQuestions;

			$scope.numAnsweredCorrect = 5;
		}
}]);