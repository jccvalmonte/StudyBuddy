app.controller('flashcardsetsController', ['$scope', '$resource', 
	function ($scope, $resource) {

		var FlashcardSet = $resource('/api/flashcard_sets');
         
       FlashcardSet.query(function (results){
       	$scope.flashcard_sets = results;
       });


	$scope.flashcard_sets = []

	$scope.createFlashcardset = function() {
	var cardset = new FlashcardSet();
	cardset.category = $scope.flashcardsetName;
	cardset.$save(function (result){
		$scope.flashcard_sets.push(result);
		$scope.flashcardsetName ='';
	});
	}

	}]);
