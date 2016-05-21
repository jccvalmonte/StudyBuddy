var app = angular.module('studybuddyApp');
app.controller('account-controller', ['$scope', '$resource', '$http', '$location','$routeParams', 
	function ($scope, $resource, $http, $location, $routeParams ) {

		$scope.getCreateUrl = function() {
			//console.log(flashcardsetName);
			var url = "/createset";
			$location.path(url);
			console.log("createset:" + url);
		}

		$scope.loginRedirectUrl = function() {
			//console.log(flashcardsetName);
			var url = "/loginAccountPage/";
			$location.path(url);
			console.log("getAccountfirst:" + url);
		}

		$scope.getAccountResults = function(email, password) {
			$scope.setit = false;
		//	$scope.email = $routeParams.email;
		//	$scope.pswd = $routeParams.password;

		var url = "/getAccount/"+ email + "/" + password;
		console.log(" get Account url "+ url);

			//$scope.myVar = false;
			$http.get(url).success(function(data){
				$scope.results = data;

				if ($scope.results.length==0){
					window.alert('Not a valid user. Please try again.');
				} else {
					var locationurl = "/getUserFlashcardsets/"+email;	
					$location.path(locationurl);			
				}
			});
		}


		$scope.initUserSignUp = function(email, firstName, lastName, password) {
			console.log('new user signup');
			var newUser = {};
			newUser.email = email;
			newUser.firstName = firstName;
			newUser.lastName = lastName;
			newUser.password = password;
			
			$scope.userSignUp = newUser;
		}

		$scope.writeUserSignUp = function() {
			console.log($scope.set);
			$http.post('/signup', $scope.userSignUp).success(function(data) {
				$scope.results = data;
				if($scope.results.length==0){
					window.alert('Account creation failed');
				}
				else{
					window.alert('Successfully created an account!');
					//window.location.href = '/home.html';
				}
			});
		}


	/*	$scope.createAccount = function(email, firstName, lastName, password) {
			console.log("Email: " + email);
			console.log("First Name: " + firstName);
			console.log("lastName: " + lastName);
			console.log("Password: " + password);

			var url = "/createAccount/"+ email + "/" + firstName + "/" + lastName + "/" + password;
			//instead of passing all the parameters we can use json object to pass the values in it

			$http.post(url).success(function(data){
				$scope.results = data;
				if($scope.results.length==0){
					window.alert('Account creation failed');
				}
				else{
					window.alert('Successfully created an account!');
					window.location.href = '/home.html';
				}

				console.log($scope.results);
			});
		}*/

		$scope.getUsercardsetResults = function() {

			$scope.email = $routeParams.email;

			var url = "/getUserFlashcardsets/"+ $scope.email;
			console.log(" getUserFlashcardsets url "+ url);

			$http.get(url).success(function(data){
				$scope.userresults = data;
				console.log($scope.userresults);
			});
		}

		$scope.redirectUserCardUrl = function(setIdNum, name) {

			var url = "/card/"+setIdNum+ "/"+name;
			console.log(url);
			$location.path(url);
		}

	}]);