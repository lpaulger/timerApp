/*globals PowerManagement */

angular.module('LP.config').factory('deviceEvents', function($log) {
  return {
    vibrate: function(interval){
      if(navigator.notification !== undefined) {
        navigator.notification.vibrate(interval);
      } else {
        $log.info('vibrate not supported');
      }
    },
    acquire: function(success, failure){
      if(typeof PowerManagement !== 'undefined'){
        PowerManagement.acquire(success, failure);
      } else {
        $log.info('PowerManagement not supported');
      }
    },
    release: function(success, failure){
      if(typeof PowerManagement !== 'undefined') {
        PowerManagement.release(success, failure);
      } else {
        $log.info('PowerManagement not supported');
      }
    }
  };
});
