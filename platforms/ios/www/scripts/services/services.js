'use strict';

angular.module('timerApp')
.factory('lpTimer', function($timeout){
  return function(timer, interval, callback) {
    var self = this, tId;
    this.timer = timer;
    this.interval = interval || 1000;
    this.callback = callback;

    this.start = function(){
      self.timer = self.timer - interval;
      tId = $timeout(self.start, interval);
      var datetime = new Date(self.timer);
      if(datetime.getHours() === 0 && datetime.getMinutes() === 0 && datetime.getSeconds() === 0){
        callback();
      }
    };

    this.stop = function(){

    };

    this.pause = function(){

    };
  };
});