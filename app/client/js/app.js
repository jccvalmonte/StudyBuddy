'use strict';

var app= angular
  			.module('studybuddyApp', [
		    'ngResource',
		    'ngRoute',
  		])
  .config(function ($routeProvider) {
    $routeProvider

    .when('/home', {
      templateUrl: '/home.html'
    })
    .when('/searchFlashcard/:flashcardsetName', {
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
    .when('/createset',{
      templateUrl: '/client/views/create-set.html',
      controller: 'card-set-controller'
    }) 
    .otherwise({
      redirectTo: '/'
    });
  });