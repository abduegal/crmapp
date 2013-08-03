'use strict';
define([ 'angular'], function(angular) {

    angular.module('crmApp').controller('ViewFormCtrl', 
      function ($scope, Restangular, $location) {

        /**
         * Fetches data and activates the menu link
         */
        $scope.onInit = function(collectionName, menuName){
          Restangular.all(collectionName).getList().then(function(data){
            $scope.collections = data;
          });
                
          $scope.$emit('event:menuLinkActivate', menuName);
        }
        
        /**
         * Navigates to the edit path
         */
        $scope.edit = function(id, path){
          $location.path(path+'/edit/'+id);
        }
        
        /**
         * Deletes the object
         */
        $scope.deleteA = function(object, objectName){
          if (confirm('Are you sure you want to delete this '+objectName+'?')) { 
            object.remove();
            $scope.collections.splice($scope.collections.indexOf(object), 1);
          }
        }
      });

  });
