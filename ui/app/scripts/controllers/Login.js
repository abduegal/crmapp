'use strict';
define([ 'angular', 'services/restangular'], function(angular) {
        
  angular.module('crmApp').controller('LoginCtrl', 
    function(Restangular, $scope, $location) {
  
      // Tells the Root controller to disable the navbar
      $scope.$emit('event:loginPageEntered', true);
    
      /**
       * Checks if the user is already logged in
       */
      $scope.authCheck = function(){
        Restangular.all('').getList().then(function(){
          $scope.redirect();
        },function(){
          console.log("not logged in");
        });
      };
      
      /**
       * A login object
       */
      $scope.login = {
        username : '',
        password : '',
        remember : false
      };

      /**
       * Form onSubmit 
       */
      $scope.onLogin = function() {
        Restangular.all('login').post($scope.login).then(function() {
          $scope.redirect();
        },function(output) {
          $scope.errors = output.data;
        });
      };
      
      /**
       * Redirects to the next page
       */
      $scope.redirect = function(){
        delete $scope.error;
        $scope.$emit('event:loginPageEntered', false);
        $location.path('/home');
      };

    });
});
