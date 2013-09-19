'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('timerApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should set defaults', function () {
    expect(scope.defaults.repeat).toBe(2);
  });
});
