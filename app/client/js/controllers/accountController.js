var app = angular.module('studybuddyApp');
app.controller('accountController', ['$scope', '$resource', '$http', '$location','$routeParams', 
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

		$scope.csRedirectUrl = function() {
			//console.log(flashcardsetName);
			var url = "/createset";
			$location.path(url);
			console.log("redirect to: " + url);
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

					if($scope.results.length==0){
						window.alert('Not a valid user, Please Try again');
					}
					else{
							//window.location.href("myFlashcards.html");
									//$scope.setit = !$scope.setit;
								var locationurl = "/getUserFlashcardsets/"+email;	
								$location.path(locationurl);			
						}
				});

		}

		$scope.createAccount = function(email, firstName, lastName, password) {
			console.log("Email: " + email);
			console.log("First Name: " + firstName);
			console.log("lastName: " + lastName);
			console.log("Password: " + password);

			var url = "/createAccount/"+ email + "/" + firstName + "/" + lastName + "/" + password;

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
		}

				//gethomepageurl 
				$scope.getUsercardsetResults = function() {

					$scope.email = $routeParams.email;

					var url = "/getUserFlashcardsets/"+ $scope.email;
					console.log(" getUserFlashcardsets url "+ url);

					$http.get(url).success(function(data){
						$scope.userresults = data;
						console.log($scope.userresults);

					});
				}
		//redirectUserCardUrl

		$scope.redirectUserCardUrl = function(setIdNum, name) {

			var url = "/card/"+setIdNum+ "/"+name;
			console.log(url);
			$location.path(url);

		}
	/*	$scope.myflashcardsets = function() {
			console.log("test here I am");
			var url = "/getAccount/"+ email;
				$location.path(url);

			//console.log("getAccountfirst:" + url);
		}*/
	}]);