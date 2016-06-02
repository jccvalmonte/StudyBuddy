var app = angular.module('studybuddyApp');

app.controller('quiz-controller', ['$scope', '$resource', '$http', '$location','$routeParams', 
	function ($scope, $resource, $http, $location, $routeParams, $mdDialog) {

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
			var question_input = $scope.questions[0].input;
			console.log("question.input is : "+ question_input);

			for(var i = 0; i < numQuestions; i++) {
				if ($scope.questions[i].back == $scope.questions[i].input)
					numCorrect++;
			}

			$scope.numAnsweredCorrect = numCorrect;
		}
}]);