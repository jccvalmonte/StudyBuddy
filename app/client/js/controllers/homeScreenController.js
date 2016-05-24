

var app = angular.module('studybuddyApp');
app.controller('homeScrnCntrl',[$scope, $rootScope, $http,
		function($scope, $rootScope, $http){

			$scope.getSets = function(){
				$http.get('/sets').success(function(data,status,headers,config){
					$scope.results = data;

					var setResults = [];
					for(var i = 0; i < data.length; i++){
						setResults[i] = { "Name": data[i].Name, "Category": data[i].Category, 
						"Author": data[i].Author}
					}
					$rootScope.setResults = setResults;
				});
			};
		}
	]);