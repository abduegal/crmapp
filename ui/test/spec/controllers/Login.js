'use strict';
define(['app', 'config', 'angular'], function(App, config, angular) {
  
  describe('Controller: LoginCtrl', function () {
  
    // load the controller's module
    beforeEach(module('crmApp'));
  
    var LoginCtrl, scope, $httpBackend, Restangular;
  
    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, _Restangular_, _$httpBackend_) {
      scope = $rootScope.$new();
      Restangular = _Restangular_;
      $httpBackend = _$httpBackend_;
      LoginCtrl = $controller('LoginCtrl', {
        $scope: scope
      });
    }));
  
    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
    
    it('should redirect when the user is already logged in', function(){
      $httpBackend.expectGET(Restangular.all('').getRestangularUrl()).respond('{}');
      spyOn(Restangular, 'all').andCallThrough();
      scope.authCheck();
      $httpBackend.flush();
      expect(Restangular.all).toHaveBeenCalled();
    });
    
    it('should have an empty user object', function () {
      expect(scope.login).toBeDefined();
      expect(scope.login.username).toBe('');
    });
    
    it('should be able to login', function(){
      $httpBackend.expectPOST('http://localhost:9000/login', scope.login).respond('{}');
    	spyOn(Restangular, 'all').andCallThrough();
    	scope.onLogin();
      $httpBackend.flush();
      expect(Restangular.all).toHaveBeenCalled();
    });
    
    it('should throw an error, when wrong credentials', function(){
    	var errorMessage = {"username":["Invalidusernameorpassword"],"password":["Invalidusernameorpassword"]};
      $httpBackend.expectPOST('http://localhost:9000/login', scope.login).respond(400, errorMessage);
    	scope.onLogin();
      $httpBackend.flush();
      expect(scope.errors).toBe(errorMessage);
    });
    
  });
  
});