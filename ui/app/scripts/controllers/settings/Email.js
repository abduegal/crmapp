'use strict';
define([ 'angular'], function(angular) {

    angular.module('crmApp').controller('EmailCtrl', 
      function (Restangular, $scope, $location) {
        
        $scope.addLink = function(){
          $scope.email.body += '{{LINK}}';
        };
    });

  });
