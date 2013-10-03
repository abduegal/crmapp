'use strict';
define(['app', 'config', 'angular'], function(App, config, angular) {

  describe('Controller: RootCtrl', function () {
  
    // load the controller's module
    beforeEach(module('crmApp'));
  
    var RootCtrl, scope, location, $httpBackend, Restangular;
  
    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, $location, _$httpBackend_, _Restangular_) {
      scope = $rootScope.$new();
      location = $location;
      Restangular = _Restangular_;
      $httpBackend = _$httpBackend_;
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('http://localhost:9000/company/1').respond(400);
      $httpBackend.expectGET('http://localhost:9000/email/1').respond(400);
      RootCtrl = $controller('RootCtrl', {
        $scope: scope
      });
      $httpBackend.flush();
    }));
    
    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
  
    it('should have a title object', function () {
      expect(scope.company).toBeDefined();
    });
    
    it('should have a navbar object', function(){
      expect(scope.navbar).toBeDefined();
    });
    
    it('should be able to logout', function(){
      $httpBackend.expectGET('http://localhost:9000/login').respond('{}');
      spyOn(Restangular, 'all').andCallThrough();
      spyOn(location, 'path');
      scope.logout();
      $httpBackend.flush();
      expect(Restangular.all).toHaveBeenCalled();
      expect(location.path).toHaveBeenCalled();
    });
  });
  
});