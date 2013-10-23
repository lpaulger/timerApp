'use strict';

angular.module('timerApp')
  .controller('MainCtrl', function($scope, $timeout, $navigate, events, dataStore, Timer) {
    $scope.timer = dataStore.get('timer');
    $scope.intervalTimer = dataStore.get('intervalTimer');
    $scope.repeat = dataStore.get('repeat');
    $scope.useIntervalTimer = dataStore.get('useIntervalTimer');

    $scope.timeVisual = new Date($scope.timer);

    $scope.$watch('timer', function(time) {
      $scope.timeVisual = new Date($scope.timer);
    });

    $scope.$watch('useIntervalTimer', function(val) {
      dataStore.save('useIntervalTimer', val);
    });

    var timer1, timer2, timer1Promise, timer2Promise;
    $scope.isRunning = false;
    $scope.isTimerRunning = false;

    //default arrow intervals
    $scope.hstep = 1;
    $scope.mstep = 1;
    $scope.sstep = 1;

    $scope.showTimerModal = function() {
      $navigate.go('/Timer', 'modal');
    };

    $scope.showIntervalModal = function() {
      $navigate.go('/IntervalTimer', 'modal');
    };

    $scope.start = function() {
      if (!$scope.isRunning) {
        events.start();
        dataStore.save('repeat', $scope.repeat);
      }
      dataStore.save('timer', $scope.timer);
      dataStore.save('intervalTimer', $scope.intervalTimer);
      $scope.isRunning = true;
      $scope.isTimerRunning = true;
      timer1 = new Timer({
        timestamp: $scope.timer,
        interval: 1000
      });
      timer1.start(function(time) {
        events.intervalTick();
        $scope.timer = time;
      }).then(function() {
        events.intervalEnd();
        $scope.timer = dataStore.get('timer');
        if ($scope.repeat > 1) {
          $scope.repeat--;
          if ($scope.useIntervalTimer) {
            timer2 = new Timer({
              timestamp: $scope.intervalTimer,
              interval: 1000
            });
            timer2.start(function(time) {
              $scope.isTimerRunning = false;
              events.intervalTick();
              $scope.intervalTimer = time;
            }).then(function() {
              events.intervalEnd();
              $scope.intervalTimer = dataStore.get('intervalTimer');

              $scope.start();
            });
          } else {
            $scope.start();
          }
        } else {
          $scope.isRunning = false;
          $scope.stop();
        }
      });
    };

    $scope.stop = function() {
      $scope.isTimerRunning = false;
      if ($scope.isRunning) {
        //the user interupted the timer
        events.cancel();
      } else {
        events.complete();
      }

      $scope.isRunning = false;
      timer1.cancel();
      if (timer2) {
        timer2.cancel();
      }
      $scope.timer = dataStore.get('timer');
      $scope.intervalTimer = dataStore.get('intervalTimer');
      $scope.repeat = dataStore.get('repeat');
    };

    $scope.settings = function() {
      $navigate.go('/Settings', 'slide', true);
    };

    $scope.info = function() {
      $navigate.go('/Info');
    };
  });