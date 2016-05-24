var app = angular.module('studybuddyApp');
app.controller('account-controller', ['$rootScope', '$scope', '$resource', '$http', '$location','$routeParams', 
	function ($rootScope, $scope, $resource, $http, $location, $routeParams ) {

		$scope.getCreateUrl = function() {
			//console.log(flashcardsetName);
			var url = "/createset";
			$location.path(url);
			console.log("createset:" + url);
		}

		$scope.getAccountResults = function(email, password) {

		var url = "/getAccount/"+ email + "/" + password;
		console.log(" get Account url "+ url);

			//$rootScope.userVar = false;
			$http.get(url).success(function(data){
				$scope.results = data;
				

				if ($scope.results.length==0){
					window.alert('Not a valid user. Please try again.');
				} else {
					//$scope.userVar = true;
					var locationurl = "/getUserFlashcardsets/"+email;
					$rootScope.userVar = !$rootScope.userVar;	

					$location.path(locationurl);			
				}
			});
		}

	//initUserSignUp(email, firstName, lastName, DOB, username, password)
		$scope.initUserSignUp = function(email, firstName, lastName, DOB, username, password) {
			console.log('new user signup');
			var newUser = {};
			newUser.email = email;
			newUser.firstName = firstName;
			newUser.lastName = lastName;
			newUser.dob = DOB;
			newUser.username = username;
			newUser.password = password;
			
			$scope.userSignUp = newUser;
			$scope.writeUserSignUp();
		}

		$scope.writeUserSignUp = function() {

			$http.post('/signup', $scope.userSignUp).success(function(data) {
				$scope.results = data;

				/*if($scope.results.length==0){
					window.alert('Account creation failed');
				}
				else{
					window.alert('Successfully created an account, Please Login!');
					//window.location.href = '/home.html';
				}*/
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
				//$scope.userVar = true;

				console.log($scope.userresults);
			});
		}

		$scope.redirectUserCardUrl = function(setIdNum, name) {

			var url = "/card/"+setIdNum+ "/"+name;
			console.log(url);
			$location.path(url);
		}

	}]);