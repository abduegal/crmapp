define(['app', 'config'], function(App, config) {

  'use strict';
  
  describe('Controller: HomeCtrl', function () {
  
    // load the controller's module
    beforeEach(module('crmApp'));
  
    var HomeCtrl,
      scope;
  
    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
      scope = $rootScope.$new();
      HomeCtrl = $controller('HomeCtrl', {
        $scope: scope
      });
    }));
  
    it('should have the data object defined', function () {
      expect(scope.data).toBeDefined();
    });
  });

});