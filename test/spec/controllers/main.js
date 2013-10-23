'use strict';

describe('Controller: MainCtrl', function() {

  //load code
  beforeEach(module('timerApp'));

  // load the templates
  beforeEach(module('views/main.html'));

  var MainCtrl,
    scope, _timer, _intervalTimer, _repeat;


  beforeEach(inject(function($controller, $rootScope) {
    _timer = new Date().setHours(0, 0, 5, 0);
    _intervalTimer = new Date().setHours(0, 0, 3, 0);
    _repeat = 2;
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should set defaults', function() {
    expect(scope.repeat).toBe(_repeat);
    expect(scope.timer).toBe(_timer);
    expect(scope.intervalTimer).toBe(_intervalTimer);
  });

  describe('when show timer modal clicked', function() {
    it('should call $navigate.go', inject(function($navigate) {
      spyOn($navigate, 'go').andCallThrough();

      scope.showTimerModal();

      expect($navigate.go).toHaveBeenCalledWith('/Timer', 'modal');
    }));
  });

  describe('when show interval modal clicked', function() {
    it('should call $navigate.go', inject(function($navigate) {
      spyOn($navigate, 'go').andCallThrough();

      scope.showIntervalModal();

      expect($navigate.go).toHaveBeenCalledWith('/IntervalTimer', 'modal');
    }));
  });

  describe('when start timer clicked', function() {
    beforeEach(function() {
      jasmine.Clock.useMock();
    });
    describe('and timer is not running', function() {
      it('should not be running', function() {
        expect(scope.isRunning).toBe(false);
        scope.start();
        expect(scope.isRunning).toBe(true);
      });

      it('should not be running the timer animation', function() {
        expect(scope.isTimerRunning).toBe(false);
        scope.start();
        expect(scope.isTimerRunning).toBe(true);
      });

      it('should save the repeat count to dataStore', inject(function(dataStore) {
        spyOn(dataStore, 'save').andCallThrough();
        scope.start();
        expect(dataStore.save).toHaveBeenCalledWith('repeat', _repeat);
      }));

      it('should save the timer value', inject(function(dataStore) {
        spyOn(dataStore, 'save').andCallThrough();
        scope.start();
        expect(dataStore.save).toHaveBeenCalledWith('timer', _timer);
      }));

      it('should save the intervalTimer value', inject(function(dataStore) {
        spyOn(dataStore, 'save').andCallThrough();

        scope.start();

        expect(dataStore.save).toHaveBeenCalledWith('intervalTimer', _intervalTimer);
      }));
    });

    describe('and timer is running', function() {
      beforeEach(function() {
        scope.start();
      });

      it('should be running', function() {
        expect(scope.isRunning).toBe(true);
        scope.start();
        expect(scope.isRunning).toBe(true);
      });

      it('should be running the timer animation', function() {
        expect(scope.isTimerRunning).toBe(true);
        scope.start();
        expect(scope.isTimerRunning).toBe(true);
      });

      it('should not save the repeat count to dataStore', inject(function(dataStore) {
        spyOn(dataStore, 'save').andCallThrough();
        scope.start();
        expect(dataStore.save).not.toHaveBeenCalledWith('repeat', jasmine.any(Number));
      }));

      it('should save the timer value', inject(function(dataStore) {
        spyOn(dataStore, 'save').andCallThrough();
        scope.start();
        expect(dataStore.save).toHaveBeenCalledWith('timer', _timer);
      }));

      it('should save the intervalTimer value', inject(function(dataStore) {
        spyOn(dataStore, 'save').andCallThrough();

        scope.start();

        expect(dataStore.save).toHaveBeenCalledWith('intervalTimer', _intervalTimer);
      }));
    });

    describe('when one interval takes place', function() {
      var _events, _timeout;
      beforeEach(inject(function(events, $timeout) {
        _events = events;
        _timeout = $timeout;
        scope.start();
        spyOn(_events, 'intervalTick');
      }));

      it('should call the timer callback', function() {
        expect(scope.timer).toBe(_timer);
        _timeout.flush();
        expect(scope.timer).toBe(_timer - 1000);
      });

      it('should fire intervalTick', function() {
        expect(_events.intervalTick).not.toHaveBeenCalled();
        _timeout.flush();
        expect(_events.intervalTick).toHaveBeenCalled();
      });
    });

    describe('when timer completes and repeat cycles left', function() {

      var _events, _timeout, _dataStore;
      beforeEach(inject(function(events, $timeout, dataStore) {
        _events = events;
        _timeout = $timeout;
        _dataStore = dataStore;
        spyOn(scope, 'start').andCallThrough();
        spyOn(_events, 'intervalTick');
        spyOn(_events, 'intervalEnd');
      }));

      function flushTimer() {
        _timeout.flush(); //1
        _timeout.flush(); //2
        _timeout.flush(); //3
        _timeout.flush(); //4
        _timeout.flush(); //5
      }

      describe('and useIntervalTimer is false', function() {
        beforeEach(function() {
          spyOn(_dataStore, 'get').andReturn(_timer);
          scope.start();
        });

        it('should reset timer', function() {
          flushTimer();
          expect(_dataStore.get).toHaveBeenCalledWith('timer');
        });

        it('should call start', function() {
          expect(scope.start.callCount).toEqual(1);
          flushTimer();
          expect(scope.start.callCount).toEqual(2);
        });

        it('should reduce number of repeats by 1', function() {
          expect(scope.repeat).toEqual(2);
          flushTimer();
          expect(scope.repeat).toEqual(1);
        });
      });

      describe('and useIntervalTimer is true', function() {
        function flushIntervalTimer() {
          _timeout.flush(); //1
          _timeout.flush(); //2
          _timeout.flush(); //3
        }

        beforeEach(function() {
          scope.useIntervalTimer = true;
          scope.start();
          flushTimer();
          spyOn(_dataStore, 'get').andReturn(_intervalTimer);
        });

        describe('and one tick', function() {
          it('should start intervalTimers intervalTick event', function() {
            expect(_events.intervalTick.callCount).toEqual(5);
            _timeout.flush();
            expect(_events.intervalTick.callCount).toEqual(6);
          });

          it('should stop Timer animation', function() {
            expect(scope.isTimerRunning).toEqual(true);
            _timeout.flush();
            expect(scope.isTimerRunning).toEqual(false);
          });
        });

        describe('and done', function() {
          it('should call intervalEnd event', function() {
            expect(_events.intervalEnd.callCount).toEqual(1);
            flushIntervalTimer();
            expect(_events.intervalEnd.callCount).toEqual(2);
          });

          it('should reset intervalTimer', function() {
            expect(_dataStore.get).not.toHaveBeenCalled();
            flushIntervalTimer();
            expect(_dataStore.get).toHaveBeenCalledWith('intervalTimer');
          });

          it('should call start', function() {
            expect(scope.start.callCount).toEqual(1);
            flushIntervalTimer();
            expect(scope.start.callCount).toEqual(2);
          });
        });
      });
    });

    describe('when timer completes and no repeat cycles left', function() {
      var _events, _timeout, _dataStore;
      beforeEach(inject(function(events, $timeout, dataStore) {
        _events = events;
        _timeout = $timeout;
        _dataStore = dataStore;
        scope.repeat = 1;
        spyOn(scope, 'stop').andCallThrough();
        spyOn(_events, 'intervalTick');
        spyOn(_events, 'intervalEnd');
        spyOn(_events, 'complete');
        scope.start();
      }));

      function flushTimer() {
        _timeout.flush(); //1
        _timeout.flush(); //2
        _timeout.flush(); //3
        _timeout.flush(); //4
        _timeout.flush(); //5
      }

      it('should set isRunning to false', function() {
        expect(scope.isRunning).toEqual(true);
        flushTimer();
        expect(scope.isRunning).toEqual(false);
      });

      it('should call stop', function() {
        expect(scope.stop.callCount).toEqual(0);
        flushTimer();
        expect(scope.stop.callCount).toEqual(1);
      });

      it('should call completed event', function() {
        expect(_events.complete).not.toHaveBeenCalled();
        flushTimer();
        expect(_events.complete).toHaveBeenCalled();
      });
    });

    describe('when the user cancels the timer', function() {
      var _events, _timeout, _dataStore;
      beforeEach(inject(function(events, $timeout, dataStore) {
        _events = events;
        _timeout = $timeout;
        _dataStore = dataStore;
        spyOn(scope, 'stop').andCallThrough();
        spyOn(_events, 'cancel');
        scope.start();
      }));

      it('should fire cancel event',function(){
        expect(_events.cancel.callCount).toEqual(0);
        scope.stop();
        expect(_events.cancel.callCount).toEqual(1);
      });
    });
  });
});