'use strict';
angular.module('timerApp', [
  'ngRoute',
  'ui.bootstrap',
  'LocalStorageModule'
]).config([
  '$routeProvider',
  function ($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    }).otherwise({ redirectTo: '/' });
  }
]).run(function () {
});