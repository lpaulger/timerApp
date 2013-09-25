'use strict';
/* globals device */

angular.module('timerApp')
  .controller('MainCtrl', function($scope, $timeout, $modal, localStorageService) {
    $scope.defaults = {
      timer: !isNaN(new Date(parseInt(localStorageService.get('timer'), 10)).getMonth()) ? new Date(parseInt(localStorageService.get('timer'), 10)) : new Date().setHours(0, 0, 5, 0),
      intervalTimer: !isNaN(new Date(parseInt(localStorageService.get('intervalTimer'), 10)).getMonth()) ? new Date(parseInt(localStorageService.get('intervalTimer'), 10)) : new Date().setHours(0, 0, 2, 0),
      repeat: parseInt(localStorageService.get('repeat'), 10) || 2
    };

    $scope.timer = $scope.defaults.timer;
    $scope.intervalTimer = $scope.defaults.intervalTimer;
    $scope.repeat = $scope.defaults.repeat;

    var tId, tIntId;
    $scope.isRunning = false;

    //default arrow intervals
    $scope.hstep = 1;
    $scope.mstep = 1;
    $scope.sstep = 1;

    $scope.$watch('timer', function(value) {
      if (value.getTime) {
        value = value.getTime();
      }
      localStorageService.add('timer', value);
    });

    $scope.$watch('intervalTimer', function(value) {
      if (value.getTime) {
        value = value.getTime();
      }
      localStorageService.add('intervalTimer', value);
    });

    $scope.$watch('repeat', function(value) {
      localStorageService.add('repeat', value);
    });

    $scope.showIntervalModal = function() {
      var modalInstance = $modal.open({
        templateUrl: 'views/timepicker.modal.html',
        controller: 'TimepickerModalCtrl',
        resolve: {
          time: function() {
            return $scope.intervalTimer;
          }
        }
      });

      modalInstance.result.then(function(time) {
        $scope.intervalTimer = time;
      });
    };

    $scope.interval2 = function() {
      $scope.intervalTimer = $scope.intervalTimer - 1000;
      tIntId = $timeout($scope.interval2, 1000);
      var datetime = new Date($scope.intervalTimer);

      //interval timer complete
      if (datetime.getHours() === 0 && datetime.getMinutes() === 0 && datetime.getSeconds() === 0) {
        $timeout.cancel(tIntId);
        $scope.intervalTimer = $scope.defaults.intervalTimer;
        tId = $timeout($scope.interval, 1000);
      }
    };

    $scope.interval = function() {
      $scope.timer = $scope.timer - 1000;
      tId = $timeout($scope.interval, 1000);
      var datetime = new Date($scope.timer);
      if (datetime.getHours() === 0 && datetime.getMinutes() === 0 && datetime.getSeconds() === 0) {

        //do we repeat?
        if ($scope.repeat > 1) {
          $scope.repeat--; //reduce repeat count
          //start interval timer
          $timeout.cancel(tId);
          $scope.timer = $scope.defaults.timer;
          if ($scope.useIntervalTimer) {
            tIntId = $timeout($scope.interval2, 1000);
          } else {
            tId = $timeout($scope.interval, 1000);
          }
        } else {
          $scope.stop();
        }
      }
    };

    $scope.start = function() {
      $scope.isRunning = true;
      tId = $timeout($scope.interval, 1000);
    };

    $scope.pause = function() {
      $timeout.cancel(tId);
      $scope.isRunning = false;
    };

    $scope.stop = function() {
      $timeout.cancel(tId);
      $scope.isRunning = false;
      navigator.notification.vibrate(2500);
      navigator.notification.alert(
        'You are the winner!',
        function() {},
        'Game Over',
        'Done');

      $scope.timer = $scope.defaults.timer;
      $scope.intervalTimer = $scope.defaults.intervalTimer;
      $scope.repeat = $scope.defaults.repeat;
    };
  });