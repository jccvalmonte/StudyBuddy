'use strict';

var app = angular
  			.module('studybuddyApp', [
		    'ngResource',
		    'ngRoute'
  		])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/index.html'
	  })
      .when('/home', {
        templateUrl: '/client/views/homeScreen.html'
        controller: 'homeScrnCntrl'
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
      .otherwise({
        redirectTo: '/'
      });
  });