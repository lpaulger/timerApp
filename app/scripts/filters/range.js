'use strict';

angular.module('timerApp').filter('range', function() {
  return function(input, total, startAtZero) {
    var i = 0;
    if(startAtZero===false) {
      i=1;
      total ++;
    }

    total = parseInt(total, 10);
    for (i; i<total; i++){
      input.push(i);
    }
    return input;
  };
});