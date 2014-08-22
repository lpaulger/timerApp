/*globals alert*/
'use strict';

angular.module('LP.config').factory('events', function(deviceEvents, $log){
  return {
    intervalTick: function(){
      document.getElementById('clock-tick-sound').play();
    },
    intervalEnd: function(){
      document.getElementById('bell-sound').play();
      deviceEvents.vibrate(1000);
    },
    start: function(){
      deviceEvents.acquire(function(){
        $log.info('acquire success');
      }, function(){
        $log.error('acquire failure');
      });
    },
    cancel: function(){
      deviceEvents.vibrate(1000);
      document.getElementById('bell-cancel-sound').play();
      deviceEvents.vibrate(1000);
      deviceEvents.release(function(){
        $log.info('release success');
      }, function(){
        $log.error('release failure');
      });
    },
    complete: function(){
      deviceEvents.vibrate(1000);
      document.getElementById('bell-complete-sound').play();
      deviceEvents.release(function(){
        $log.info('release success');
      }, function(){
        $log.error('release failure');
      });
    }
  };
});