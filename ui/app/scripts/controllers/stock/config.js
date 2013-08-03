define([ 'angular', 'app', 
         'controllers/stock/PlaceOrder', 'controllers/stock/ViewOrder'],
    function(angular) {
      'use strict';
      
      return angular.module('crmApp')
      .config(function ($routeProvider) {
        $routeProvider
          .when('/stock/order/place', {
            templateUrl: 'views/stock/PlaceOrder.html',
            controller: 'PlaceOrderCtrl'
          })
          .when('/stock/order/view', {
            templateUrl: 'views/stock/ViewOrder.html',
            controller: 'ViewOrderCtrl'
          });
      });
      
    });