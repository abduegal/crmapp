'use strict';
define([ 'angular'], function(angular) {

    angular.module('crmApp').controller('HomeCtrl', 
      function ($scope) {
        
        $scope.data = [];

        /**
         * Activate Home menu
         */
        $scope.$emit('event:menuLinkActivate', 'Home');
        
      });

  });
