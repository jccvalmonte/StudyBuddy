var app = angular.module('studybuddyApp');
app.controller('accountsController', ['$scope', '$resource', '$http', '$location','$routeParams', 
	function ($scope, $resource, $http, $location, $routeParams ) {

		$scope.getAccount = function(email) {
			console.log(acount);
			var url = "/findAccount/"+ email;
			$location.path(url);
			console.log(url);
		}

		$scope.getAccountResult = function() {

			$scope.account = $routeParams.account;

	    	var url = "/findAccount/" + $scope.account;
			console.log("Account E-mail: "+ url);

				$http.get(url).success(function(data){
				$scope.results = data;
				console.log($scope.results);
				
			});
		}

		$scope.createAccount = function(email, password) {
			console.log(acount);
			var url = "/createAccount/"+ email + password;
			$location.path(url);
			console.log("Account Created: " + url);
		}

	}]);
