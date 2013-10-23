'use strict';
angular.module('timerApp', [
  'ngRoute',
  'ajoslin.mobile-navigate',
  'ngTouch',
  'ui.bootstrap',
  'LP.services',
  'LP.config'
]).config([
  '$routeProvider',
  function ($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    }).when('/Timer', {
      templateUrl: 'views/timepicker.modal.html',
      controller: 'TimepickerModalCtrl',
      resolve: {
        title: function () {
          return 'Timer';
        },
        timeId: function () {
          return 'timer';
        }
      }
    }).when('/IntervalTimer', {
      templateUrl: 'views/timepicker.modal.html',
      controller: 'TimepickerModalCtrl',
      resolve: {
        title: function () {
          return 'Interval';
        },
        timeId: function () {
          return 'intervalTimer';
        }
      }
    }).when('/Settings', {
      templateUrl: 'views/settings.html',
      controller: 'SettingsCtrl'
    }).when('/Info', {
      templateUrl: 'views/info.html',
      controller: 'InfoCtrl'
    }).otherwise({ redirectTo: '/' });
  }
]).value('appProperties', { version: '0.0.1' });