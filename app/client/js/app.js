'use strict';

var app = angular.module ('studybuddyApp', ['ngResource','ngRoute']);

app.config(function ($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: '/client/views/card-set.html',
    controller: 'card-set-controller'
  })
  .when('/card/:setIdNum/', {
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
    controller: 'crudSetCntrl'
  }) 
  .when('/signup', {
    templateUrl: '/client/views/sign-up.html',
    controller: 'account-controller'
  })
  .when('/login', {
    templateUrl: '/client/views/login.html',
    controller: 'account-controller'
  })
  .when('/quiz/:setIdNum', {
    templateUrl: 'client/views/quiz.html',
    controller: 'quiz-controller'
  })
});