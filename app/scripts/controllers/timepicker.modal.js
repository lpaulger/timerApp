'use strict';

angular.module('timerApp').controller('TimepickerModalCtrl', function($scope, $modalInstance, time, title){
  $scope.hstep = 1;
  $scope.mstep = 1;
  $scope.sstep = 1;
  $scope.title = title;
  $scope.intervalTimer = new Date(time);

  $scope.ok = function (timer) {
    $modalInstance.close(timer);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});