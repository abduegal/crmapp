define([ 'angular', 'app', 
         'controllers/sale/ClientSale'],
    function(angular) {
      'use strict';
      
      return angular.module('crmApp')
      .config(function ($routeProvider) {
        $routeProvider
          .when('/sale', {
            templateUrl: 'views/sale/ClientSale.html',
            controller: 'ClientSaleCtrl'
          });
      });
      
    });