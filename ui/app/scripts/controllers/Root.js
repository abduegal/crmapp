'use strict';
define([ 'angular', 'services/restangular'], function(angular) {
    
    angular.module('crmApp').controller('RootCtrl', 
      function (Restangular, $location, $scope) {
        
        $scope.navbar = false;
        
        $scope.menu = {};
        
        /**
         * Makes menu link active or inactive
         */
        $scope.$on('event:menuLinkActivate', function(event, value){
          $scope.menu = {};
          $scope.menu[value] = 'active';
        });
        
        /**
         * Enables or dissables the navbar
         */
        $scope.$on('event:loginPageEntered', function(event, value){
          $scope.navbar = value;
        });
        
        /**
         * Starts the loading spinner
         */
        $scope.$on('event:startSpinner', function(event, value){
          $scope.loading = true;
        });
        
        /**
         * Starts the loading spinner
         */
        $scope.$on('event:stopSpinner', function(event, value){
          $scope.loading = false;
          delete $scope.globalError;
        });
        
        /**
         * Starts the loading spinner
         */
        $scope.$on('event:loginRequired', function(event, value){
          $location.path('/');
        });

        /**
         * On error
         */
        $scope.$on('event:errorOccurred', function(event, value){
          $scope.globalError = "An unknown error has occured, please contact the administrator";
        });
        
        /**
         * On logout key press
         */
        $scope.logout = function(){
          Restangular.all('login').getList().then(function(){
            $location.path('/');
          });
        };
        
        /**
         * Company object
         */
        $scope.company = {
            _id : '1',
            name : 'App name',
            product : 'Product',
            client : 'Client'
        };
        
        /**
         * Email object
         */
        $scope.email = {
            _id : '1',
            body: ''
        };
        
        /**
         * Retrieving company object
         */
        Restangular.one('company', '1').get().then(function(data){
          if(!isEmptyObject(data)){
            $scope.company = data;
          }
        });
        
        /**
         * Retrieving company object
         */
        Restangular.one('email', '1').get().then(function(data){
          if(!isEmptyObject(data)){
            $scope.email = data;
          }
        });
        
        function isEmptyObject(obj) {
          var name;
          for (name in obj) {
              return false;
          }
          return true;
        };
        
      });

  });