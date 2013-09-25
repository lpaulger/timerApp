'use strict';

angular.module('timerApp')
  .constant('timepickerConfig', {
    hourStep: 1,
    minuteStep: 1,
    secondStep: 1,
    readonlyInput: false
  })
  .directive('lpTimepicker', function($parse, $log, timepickerConfig) {
    return {
      restrict: 'EA',
      require: '?^ngModel',
      replace: true,
      scope: {},
      templateUrl: 'views/directives/timepicker.html',
      link: function(scope, element, attrs, ngModel) {
        if (!ngModel) {
          return; // do nothing if no ng-model
        }

        var selected = new Date();

        if (ngModel.$error.time) {
          // Evaluate from template
          var hours = getHoursFromTemplate(),
            minutes = getMinutesFromTemplate(),
            seconds = getSecondsFromTemplate();
          if (angular.isDefined(hours) && angular.isDefined(minutes) && angular.isDefined(seconds)) {
            selected.setHours(hours);
            selected.setMinutes(minutes);
            selected.setSeconds(seconds);
            refresh();
          }
        } else {
          selected = new Date(ngModel.$viewValue);
          updateTemplate();
        }

        var hourStep = timepickerConfig.hourStep;
        if (attrs.hourStep) {
          scope.$parent.$watch($parse(attrs.hourStep), function(value) {
            hourStep = parseInt(value, 10);
          });
        }

        var minuteStep = timepickerConfig.minuteStep;
        if (attrs.minuteStep) {
          scope.$parent.$watch($parse(attrs.minuteStep), function(value) {
            minuteStep = parseInt(value, 10);
          });
        }

        var secondStep = timepickerConfig.secondStep;
        if (attrs.minuteStep) {
          scope.$parent.$watch($parse(attrs.secondStep), function(value) {
            secondStep = parseInt(value, 10);
          });
        }

        function getHoursFromTemplate() {
          var hours = parseInt(scope.hours, 10);
          return (hours >= 0 && hours < 24) ? hours : undefined;
        }

        function getMinutesFromTemplate() {
          var minutes = parseInt(scope.minutes, 10);
          return (minutes >= 0 && minutes < 60) ? minutes : undefined;
        }

        function getSecondsFromTemplate() {
          var seconds = parseInt(scope.seconds, 10);
          return (seconds >= 0 && seconds < 60) ? seconds : undefined;
        }

        function pad(value) {
          return (angular.isDefined(value) && value.toString().length < 2) ? '0' + value : value;
        }

        // Input elements
        var inputs = element.find('input'),
          hoursInputEl = inputs.eq(0),
          minutesInputEl = inputs.eq(1),
          secondsInputEl = inputs.eq(2);


        scope.readonlyInput = (angular.isDefined(attrs.readonlyInput)) ? scope.$eval(attrs.readonlyInput) : timepickerConfig.readonlyInput;
        if (!scope.readonlyInput) {

          var invalidate = function(invalidHours, invalidMinutes, invalidSeconds) {
            ngModel.$setViewValue(null);
            ngModel.$setValidity('time', false);
            if (angular.isDefined(invalidHours)) {
              scope.invalidHours = invalidHours;
            }
            if (angular.isDefined(invalidMinutes)) {
              scope.invalidMinutes = invalidMinutes;
            }
            if (angular.isDefined(invalidSeconds)) {
              scope.invalidSeconds = invalidSeconds;
            }
          };

          scope.updateHours = function() {
            var hours = getHoursFromTemplate();

            if (angular.isDefined(hours)) {
              selected.setHours(hours);
              refresh('h');
            } else {
              invalidate(true);
            }
          };

          hoursInputEl.bind('blur', function(e) {
            if (!scope.validHours && scope.hours < 10) {
              scope.$apply(function() {
                scope.hours = pad(scope.hours);
              });
            }
          });

          scope.updateMinutes = function() {
            var minutes = getMinutesFromTemplate();

            if (angular.isDefined(minutes)) {
              selected.setMinutes(minutes);
              refresh('m');
            } else {
              invalidate(undefined, true);
            }
          };

          minutesInputEl.bind('blur', function(e) {
            if (!scope.invalidMinutes && scope.minutes < 10) {
              scope.$apply(function() {
                scope.minutes = pad(scope.minutes);
              });
            }
          });

          scope.updateSeconds = function() {
            var seconds = getSecondsFromTemplate();

            if (angular.isDefined(seconds)) {
              selected.setSeconds(seconds);
              refresh('s');
            } else {
              invalidate(undefined, undefined, true);
            }
          };

          secondsInputEl.bind('blur', function(e) {
            if (!scope.invalidSeconds && scope.seconds < 10) {
              scope.$apply(function() {
                scope.seconds = pad(scope.seconds);
              });
            }
          });

        } else {
          scope.updateHours = angular.noop;
          scope.updateMinutes = angular.noop;
          scope.updateSeconds = angular.noop;
        }

        ngModel.$render = function() {
          var date = ngModel.$modelValue ? new Date(ngModel.$modelValue) : null;

          if (isNaN(date)) {
            ngModel.$setValidity('time', false);
            $log.error('Timepicker directive: "ng-model" value must be a Date object, a number of milliseconds since 01.01.1970 or a string representing an RFC2822 or ISO 8601 date.');
          } else {
            if (date) {
              selected = date;
            }
            makeValid();
            updateTemplate();
          }
        };

        // Call internally when we know that model is valid.

        function refresh(keyboardChange) {
          makeValid();
          ngModel.$setViewValue(new Date(selected));
          updateTemplate(keyboardChange);
        }

        function makeValid() {
          ngModel.$setValidity('time', true);
          scope.invalidHours = false;
          scope.invalidMinutes = false;
        }

        function updateTemplate(keyboardChange) {
          var hours = selected.getHours(),
            minutes = selected.getMinutes(),
            seconds = selected.getSeconds();

          scope.hours = keyboardChange === 'h' ? hours : pad(hours);
          scope.minutes = keyboardChange === 'm' ? minutes : pad(minutes);
          scope.seconds = keyboardChange === 's' ? seconds : pad(seconds);
        }

        function addMinutes(minutes) {
          var dt = new Date(selected.getTime() + minutes * 60000);
          selected.setHours(dt.getHours(), dt.getMinutes(), dt.getSeconds());
          refresh();
        }

        scope.incrementHours = function() {
          addMinutes(hourStep * 60);
        };
        scope.decrementHours = function() {
          addMinutes(-hourStep * 60);
        };
        scope.incrementMinutes = function() {
          addMinutes(minuteStep);
        };
        scope.decrementMinutes = function() {
          addMinutes(-minuteStep);
        };
        scope.incrementSeconds = function() {
          addMinutes(secondStep /60);
        };
        scope.decrementSeconds = function() {
          addMinutes(-secondStep/60);
        };
      }
    };
  });