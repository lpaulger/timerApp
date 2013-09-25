'use strict';
document.addEventListener('deviceready', function () {
  console.log(device);
}, false);
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
  document.addEventListener('deviceready', function () {
    console.log(device.model);
  }, false);
});