/*globals alert*/
'use strict';

angular.module('LP.config').factory('events', function(deviceEvents){
  return {
    intervalTick: function(){
      document.getElementById('clock-tick-sound').play();
    },
    intervalEnd: function(){
      deviceEvents.vibrate(1000);
      document.getElementById('bell-sound').play();
    },
    start: function(){
      deviceEvents.acquire(function(){
        alert('success');
      }, function(){
        alert('failure');
      });
    },
    cancel: function(){
      deviceEvents.vibrate(1000);
      document.getElementById('bell-cancel-sound').play();
      deviceEvents.vibrate(1000);
      deviceEvents.release(function(){
        alert('success');
      }, function(){
        alert('failure');
      });
    },
    complete: function(){
      deviceEvents.vibrate(1000);
      document.getElementById('bell-complete-sound').play();
      deviceEvents.release(function(){
        alert('success');
      }, function(){
        alert('failure');
      });
    }
  };
});