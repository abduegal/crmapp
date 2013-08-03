'use strict';
define([ 'angular'], function(angular) {
    
  angular.module('crmApp').controller('SettingsCtrl', 
    function ($scope) {
      
      /**
       * Activate Settings menu
       */
      $scope.$emit('event:menuLinkActivate', 'Settings');
    });

});