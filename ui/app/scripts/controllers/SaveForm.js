'use strict';
define([ 'angular'], function(angular) {

    angular.module('crmApp').controller('SaveFormCtrl', 
      function ($scope, Restangular, $location) {
      
        $scope.action = 'Add';
      
        $scope.onSave = function(collectionName, redirectTo){
          $scope.buttonDisabled = "disabled";
          Restangular.all(collectionName).post($scope[collectionName]).then(function(){
            $location.path(redirectTo);
          },function(output){
            $scope.buttonDisabled = "";
            $scope.errors = output.data;
          });
        };
        
        /**
         * Activate a menu
         */
        $scope.onInit = function(collectionName, menuName){
          $scope.$emit('event:menuLinkActivate', menuName);
        };
        
      });

  });
