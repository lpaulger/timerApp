'use strict';

angular.module('timerApp').controller('SettingsCtrl', function($scope, $navigate){
  $scope.back = function(){
    $navigate.go('/');
  };
});