'use strict';

angular.module('timerApp', ['ngRoute', 'ajoslin.mobile-navigate', 'ngTouch', 'ui.bootstrap', 'LP.services', 'LP.config'])
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/Settings', {
        templateUrl: 'views/settings.html',
        controller: 'SettingsCtrl'
      })
      .when('/Info', {
        templateUrl: 'views/info.html',
        controller: 'InfoCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }).value('appProperties', {
    version: '0.0.1'
  });