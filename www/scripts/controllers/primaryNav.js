'use strict';
/* globals device */

angular.module('timerApp')
.controller('PrimaryNavCtrl', function($scope) {
  $scope.title = device.name;
});