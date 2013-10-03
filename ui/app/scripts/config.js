define([ 'angular', 'app', 'directives/FormComponent', 'directives/spinner',
         'services/errorHttpInterceptor', 'services/restangular', 'filters/highlight',
         'controllers/Root', 'controllers/Home', 'controllers/Login', 'controllers/Settings',
         'controllers/settings/config', 'controllers/stock/config'],
    function(angular) {
      'use strict';
      
      return angular.module('crmApp')
      .config(function ($routeProvider) {
        $routeProvider
          .when('/', {
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl'
          })
          .when('/home', {
            templateUrl: 'views/Home.html',
            controller: 'HomeCtrl'
          })
          .when('/settings', {
            templateUrl: 'views/Settings.html',
            controller: 'SettingsCtrl'
          })
          .otherwise({
            redirectTo: '/home'
          });
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