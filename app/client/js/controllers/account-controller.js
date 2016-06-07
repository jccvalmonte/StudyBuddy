var app = angular.module('studybuddyApp');

app.controller('account-controller', ['$rootScope', '$scope', '$resource', '$http', '$location','$routeParams', 
	function ($rootScope, $scope, $resource, $http, $location, $routeParams ) {

		$scope.getAllusers = function() {

			$http.get("/getallusers").success(function(data){
				//$scope.userresults = data;

				 $scope.userresults = data;
				 //	repeatSelect: null,
				 //	data
			
			});
		}

		$scope.userRedirect = function(selecteduser) {
			var selectemail = selecteduser.email;
		console.log("Inside user specific picklist location path url call: "+ selectemail);
			var url = "/getuser/"+selectemail;
			$location.path(url);

		}

		$scope.getUserSets = function(){
			console.log("user specific picklist getUserSets call");
			//console.log("userresults.repeatSelect" + selecteduser.email);
			var selectedemail= $routeParams.selectemail;
			console.log("selected user email is: "+ selectedemail);
			var url = "/getUserSets/"+ selectedemail;

			$http.get(url).success(function(data) {
				
				$scope.usersets = data;
			});
		}

				$scope.getcardResults = function() {
			$scope.setIdNum = $routeParams.setIdNum;

	    	var url = "/card/" + $scope.setIdNum;
			console.log(url);

			$http.get(url).success(function(data){
				var i = 0;
				$scope.i = i;
				$scope.resultCards = data;
				
				console.log("result cards: " + $scope.resultCards);	
			});
		}


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
				//console.log("returned values are:"+ results.email);
			});
		}

		$scope.redirectUserCardUrl = function(setIdNum, name) {
			var url = "/card/" + setIdNum;
			$location.path(url);
		}

		$scope.redirectModifySetUrl = function(setIdNum){
			var url = "/modifySet/" + setIdNum;
			$location.path(url);
		}
		
		$scope.deleteSet = function(setIdNum){
			var url = "/deleteSet/" + setIdNum;
			$http.delete(url);
		}

		$scope.deleteCards = function(setIdNum){
			var url = "/deleteCards/" + setIdNum;
			$http.delete(url);
		}

		$scope.loginUserSets = function(){
			var loginurl = "/auth/facebook";
			$http.get(loginurl).success(function(data){
				$scope.results = data;
				console.log("login results back"+ $scope.results);
				var user_token = $scope.results.token;
				var newuserpageurl = "/userSets"+ user_token;
				$location.path(newuserpageurl);
			});
		}

		$scope.signIn = function() {
			$rootScope.signedIn = true;
		}
}]);