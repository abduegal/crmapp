'use strict';
define([ 'angular'], function(angular) {

    angular.module('crmApp').controller('UpdateFormCtrl', 
      function ($scope, Restangular, $location, $routeParams) {

        /* -- Init vars -------------------------------- */
        $scope.action = 'Edit';
        
        $scope.hide = 'true';
        $scope.novalidate = 'novalidate';
        
        $scope.buttonDisabled = false;

        /* -- actions ---------------------------------- */
        
        $scope.onSave = function(collectionName, redirectTo){
          $scope.buttonDisabled = true;
          if($scope[collectionName].put == undefined){
            $scope[collectionName] = Restangular.all(collectionName).post($scope[collectionName]).get().then(function(data){
              $location.path(redirectTo);
            });
          }else{
            $scope[collectionName].put().then(function(){
              $location.path(redirectTo);
            },function(output){
              $scope.buttonDisabled = false;
              $scope.errors = output.data;
            });  
          }
        };

        $scope.onInit = function(collectionName, menuName){
          if(collectionName){
            Restangular.one(collectionName, $routeParams.id).get().then(function(data){
              $scope[collectionName] = data;
            });
          }

          $scope.$emit('event:menuLinkActivate', menuName);
        };
                
      });

  });
