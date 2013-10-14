define([ 'angular', 'emailpart/app', 'controllers/stock/config', 'controllers/Root',
         'services/errorHttpInterceptor', 'services/restangular', 'filters/highlight',
         'emailpart/StockEmailCtrl'],
    function(angular) {
      'use strict';
      
      return angular.module('emailApp')
      .config(function ($routeProvider) {
        $routeProvider
          .when('/:id', {
            templateUrl: 'views/stock/email.html',
            controller: 'StockEmailCtrl'
          })
      })
      .config(function ($httpProvider){
        var ajaxSpinner = function (data, headersGetter) {
          var $injector  = angular.element(document.querySelector('html')).injector();
          if($injector != undefined){
            var $rootScope = $injector.get('$rootScope');
            $rootScope.$broadcast('event:startSpinner');
          }
          return data;
        };
        $httpProvider.responseInterceptors.push('errorHttpInterceptor');
        $httpProvider.defaults.transformRequest.push(ajaxSpinner);
        $httpProvider.defaults.withCredentials = true;
      })
      .config(function(RestangularProvider) {
        RestangularProvider.setBaseUrl("http://localhost:9000/");
        RestangularProvider.setDefaultHttpFields({withCredentials: true});
        RestangularProvider.setRestangularFields({id: "_id"});
      });

      
    });