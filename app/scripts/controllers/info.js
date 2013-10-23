'use strict';

angular.module('timerApp').controller('InfoCtrl', function($scope, $navigate, appProperties){
  $scope.version = appProperties.version;
  $scope.device = window.device;
  $scope.back = function(){
    $navigate.go('/', 'slide', true);
  };
});