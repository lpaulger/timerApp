angular.module('LP.services').factory('Timer', function($q, $timeout, $log) {
  return function(options) {

    if (!options.timestamp || !options.interval) {
      throw new Error('Missing argument(s)');
    }
    var timerId;
    var deferred = $q.defer();
    var self = this;
    var _timestamp = options.timestamp;
    var _interval = options.interval;

    this.running = false;

    this.interval = function(cb) {
      if (self.running) {
        _timestamp = _timestamp - _interval;
        $log.info(_timestamp);
        timerId = $timeout(function() {
          self.interval(cb);
        }, _interval);
        var datetime = new Date(_timestamp);
        if (datetime.getHours() === 0 && datetime.getMinutes() === 0 && datetime.getSeconds() === 0) {
          self.stop();
        }
        cb(_timestamp); //interval callback
      }
    };

    this.start = function(cb) {
      self.running = true;
      $timeout(function() {
        self.interval(cb);
      }, _interval);
      return deferred.promise;
    };

    this.cancel = function() {
      self.running = false;
      return deferred.reject();
    };

    this.stop = function() {
      $timeout.cancel(timerId);
      deferred.resolve();
    };
  };
});