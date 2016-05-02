app.controller('flashcardsetsController', ['$scope', '$resource', '$http', 
	function ($scope, $resource, $http) {

			var FlashcardSet = $resource('/api/flashcard_sets');
	         
	       FlashcardSet.query(function (results){
	       	$scope.flashcard_sets = results;
	       });


		$scope.flashcard_sets = []

		$scope.getFlashcardset = function(flashcardsetName) {
			console.log(flashcardsetName);
			var url = "/searchFlashcard/"+flashcardsetName;

			console.log(url);
			$http.get(url).success(function(data){
				$scope.results = data;
				console.log("Test : ", $scope.results);
			});

		/*	cardset.$save(function (result){
				$scope.flashcard_sets.push(result);
				$scope.flashcardsetName ='';
			}); */
		}

		$scope.getHomeurl = function() {
			console.log('hello');
			var url = "/home";

			console.log(url);
			$http.get(url);
		}

		$scope.getSignurl = function() {
			var url = "/signup";

			console.log(url);
			$http.get(url);
		}
		/*	cardset.$save(function (result){
				$scope.flashcard_sets.push(result);
				$scope.flashcardsetName ='';
			}); */

	}]);