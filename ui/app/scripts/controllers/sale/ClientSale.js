'use strict';
define([ 'angular'], function(angular) {

    angular.module('crmApp').controller('ClientSaleCtrl', 
      function ($scope, Restangular, $location) {
      
        /**
         * Activate Sale menu
         */
        $scope.$emit('event:menuLinkActivate', 'Sale');
        
      });

  });
