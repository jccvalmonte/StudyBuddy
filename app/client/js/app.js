'use strict';

var app= angular
  			.module('studybuddyApp', [
		    'ngResource',
		    'ngRoute',
  		])
  .config(function ($routeProvider) {
    $routeProvider
      /*.when('/', {
        templateUrl: '/index.html'
	  })*/
      .when('/home', {
        templateUrl: '/home.html'
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
      .otherwise({
        redirectTo: '/'
      });
  });