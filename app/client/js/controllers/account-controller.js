var app = angular.module('studybuddyApp');

app.controller('account-controller', ['$rootScope', '$scope', '$resource', '$http', '$location','$routeParams', 
	function ($rootScope, $scope, $resource, $http, $location, $routeParams ) {

		$scope.checklogin = function(username) {

		var url = "/checklogin/"+ username;
		console.log(" get login url "+ url);

			//$rootScope.userVar = false;
			$http.get(url).success(function(data){
				$scope.userid = data;
				

				if ($scope.userid.length==0){
					window.alert('Not a valid user. Please try again.');
				} else {
					console.log("logging out:"+ $scope.userid);
					var user_id = JSON.parse($scope.userid);
					
						var user_url = "/userSetsurl/"+ user_id;
						console.log("user url is: "+ user_url);
						$location.path(user_url);

					//$scope.userVar = true;
					//var locationurl = "/getUserFlashcardsets/"+email;
					//$rootScope.userVar = !$rootScope.userVar;	

					//$location.path(locationurl);			
				}
			});
		}

		$scope.getUsercardsetResults = function() {

			$scope.userid = $routeParams.user_id;

			var url = "/getUsersets/"+ $scope.userid;
			console.log(" get url "+ url);

			$http.get(url).success(function(data){
				$scope.userresults = data;
				//$scope.userVar = true;

				console.log("userresults"+ $scope.userresults);
			});
		}

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

		$scope.redirectUserCardUrl = function(setIdNum, name) {
			var url = "/card/"+setIdNum+ "/"+name;
			console.log(url);
			$location.path(url);
		}

		$scope.deleteSet = function(idNum){
			var url = "/deleteSet/:" + idNum;
			console.log(url);
			$http.get(url);
		}

		$scope.loginUserSets = function(){
			var loginurl = "/auth/facebook";
			console.log("loginurl: "+ loginurl);
			//$location.path(loginurl);
			$http.get(loginurl).success(function(data){
				$scope.results = data;
				console.log("login results back"+ $scope.results);
				var user_token = $scope.results.token;
				var newuserpageurl = "/userSets"+ user_token;
				$location.path(newuserpageurl);
			});
		}
}]);