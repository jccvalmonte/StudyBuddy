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
  .when('/quiz/:setIdNum/', {
    templateUrl: '/client/views/quiz.html',
    controller: 'quiz-controller'
  })
  .when('/getAccount/:email', {
    templateUrl: '/client/views/account.html',
    controller: 'account-controller'
  })
  .when('/getUserFlashcardsets/:email', {
    templateUrl: '/client/views/user-flashcards.html'
  })
  .when('/createSet', {
    templateUrl: '/client/views/create-set.html',
    controller: 'create-set-controller'
  }) 
  .when('/signup', {
    templateUrl: '/client/views/sign-up.html',
    controller: 'account-controller'
  })
  .when('/login', {
    templateUrl: '/client/views/login.html',
    controller: 'account-controller'
  })
  .when('/loginUserSets', {
    templateUrl: '/client/views/user-flashcards.html',
    controller: 'account-controller'
  })
  .when('/userSetsurl/:user_id', {
    templateUrl: '/client/views/user-flashcards.html',
    controller: 'account-controller'
  })
  .when('/mySets', {
    templateUrl: '/client/views/fb-user-sets.html',
    controller: 'fb-user-sets-controller'
  })
  .when('/modifySet/:setIdNum', {
    templateUrl: '/client/views/modify-set.html',
    controller: 'modify-set-controller'
  })
  .when('/getuser/:selectemail', {
    templateUrl: '/client/views/picklist-user.html',
    controller: 'account-controller'
  })
});