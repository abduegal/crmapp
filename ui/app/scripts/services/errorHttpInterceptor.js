'use strict';

define([ 'angular'],
  function(angular) {
    
    return angular.module('crmApp')
      .factory('errorHttpInterceptor', function ($q, $location, $rootScope) {

        return function(promise){
          
          return promise.then(function(response){
            /**
             * For success
             */
            $rootScope.$broadcast('event:stopSpinner');
            return response;
          }, 
          function (response){
            /**
             * For error 401 - not authorized
             */
            if(response.status === 401){
              $rootScope.$broadcast('event:stopSpinner');
              $rootScope.$broadcast('event:loginRequired');
              return $q.reject(response);
            }
            /**
             * For error bad request
             */
            if(response.status === 400){
              $rootScope.$broadcast('event:stopSpinner');
              return $q.reject(response);
            }
            /**
             * For all other errors
             */
            $rootScope.$broadcast('event:stopSpinner');
            $rootScope.$broadcast('event:errorOccurred');
            return $q.reject(response);
          });
        };
      })
  });