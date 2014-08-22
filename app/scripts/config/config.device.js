/*globals powerManagement */

angular.module('LP.config').factory('deviceEvents', function($log) {
  return {
    vibrate: function(interval){
      if(navigator.vibrate !== undefined) {
        navigator.vibrate(interval);
      } else {
        $log.info('vibrate not supported');
      }
    },
    acquire: function(success, failure){
      if(typeof powerManagement !== 'undefined'){
        powerManagement.acquire(success, failure);
      } else {
        $log.info('powerManagement not supported');
      }
    },
    release: function(success, failure){
      if(typeof powerManagement !== 'undefined') {
        powerManagement.release(success, failure);
      } else {
        $log.info('powerManagement not supported');
      }
    }
  };
});
