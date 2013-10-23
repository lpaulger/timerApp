'use strict';

angular.module('timerApp').controller('TimepickerModalCtrl', function($scope, $navigate, dataStore, timeId, title){
  $scope.title = title;
  $scope.time = new Date(dataStore.get(timeId));

  $scope.hours = $scope.time.getHours();
  $scope.minutes = $scope.time.getMinutes();
  $scope.seconds = $scope.time.getSeconds();

  $scope.$watch('hours', function(val){
    $scope.time.setHours(val);
    dataStore.save(timeId, $scope.time);
  });

  $scope.$watch('minutes', function(val){
    $scope.time.setMinutes(val);
    dataStore.save(timeId, $scope.time);
  });

  $scope.$watch('seconds', function(val){
    $scope.time.setSeconds(val);
    dataStore.save(timeId, $scope.time);
  });

  $scope.back = function(){
    $navigate.go('/', 'modal', true);
  };
});