'use strict';

angular.module('LP.services').factory('dataStore', function(localStorageService) {
    var self = this;
    var defaults = {
      timer: new Date().setHours(0, 0, 5, 0),
      intervalTimer: new Date().setHours(0, 0, 3, 0),
      useIntervalTimer: true,
      repeat: 2
    };

    this.timer = function() {
      if (!isNaN(new Date(parseInt(localStorageService.get('timer'), 10)).getMonth())) {
        return parseInt(localStorageService.get('timer'), 10);
      } else {
        return defaults.timer;
      }
    };

    this.intervalTimer = function() {
      if (!isNaN(new Date(parseInt(localStorageService.get('intervalTimer'), 10)).getMonth())) {
        return parseInt(localStorageService.get('intervalTimer'), 10);
      } else {
        return defaults.intervalTimer;
      }
    };

    this.useIntervalTimer = function() {
      return JSON.parse(localStorageService.get('useIntervalTimer'));
    };

    this.repeat = function() {
      return parseInt(localStorageService.get('repeat'), 10) || defaults.repeat;
    };

    return {
      get: function(name) {
        return self[name]();
      },
      save: function(name, value) {
        if (value !== null && value.getTime) {
          value = value.getTime();
        }
        localStorageService.add(name, value);
      }
    };
  });