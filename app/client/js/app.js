'use strict';

<<<<<<< HEAD
var app = angular
  			.module('studybuddyApp', [
		    'ngResource',
		    'ngRoute',
  		])
  .config(function ($routeProvider) {
    $routeProvider
    /*  .when('/', {
        templateUrl: '/index.html'
	  })*/
      .when('/home', {
        templateUrl: '/client/views/homeScreen.html',
        controller: 'homeScrnCntrl'
      })
      .when('/loginAccountPage', {
        templateUrl: '/client/views/accountLogin.html'
      })
       .when('/signup', {
        templateUrl: '/client/views/signUp.html'
      })
      .when('/searchFlashcard/:flashcardsetName', {
        templateUrl: '/client/views/cardset.html',
        controller: 'flashcardsetsController'
      })
      .when('/card/:setIdNum/:name', {
        templateUrl: '/client/views/card.html',
        controller: 'cardsController'
      })
      .when('/getAccount/:email', {
        templateUrl: '/client/views/account.html',
        controller: 'accountController'
      })
      .when('/getUserFlashcardsets/:email', {
        templateUrl: '/client/views/displayUserFlashcards.html'
      })
      .when('/createset',{
        templateUrl: '/client/views/createset.html',
        controller: 'flashcardsetsController'
      }) 
      .when('/createset',{
        templateUrl: '/client/views/createset.html',
        controller: 'flashcardsetsController'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
=======
var app = angular.module ('studybuddyApp', ['ngResource','ngRoute']);

app.config(function ($routeProvider) {
  $routeProvider

  .when('/', {
    templateUrl: '/client/views/card-set.html',
    controller: 'card-set-controller'
  })
  .when('/card/:setIdNum/:name', {
    templateUrl: '/client/views/card.html',
    controller: 'card-controller'
  })
  .when('/getAccount/:email', {
    templateUrl: '/client/views/account.html',
    controller: 'account-controller'
  })
  .when('/getUserFlashcardsets/:email', {
    templateUrl: '/client/views/user-flashcards.html'
  })
  .when('/createset', {
    templateUrl: '/client/views/create-set.html',
    controller: 'crud-set-controller'
  }) 
  .when('/signup', {
    templateUrl: '/client/views/sign-up.html',
    controller: 'account-controller'
  })
  .when('/login', {
    templateUrl: '/client/views/login.html',
    controller: 'account-controller'
  })
});
>>>>>>> refs/remotes/origin/master
