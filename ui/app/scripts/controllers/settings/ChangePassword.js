'use strict';
define([ 'angular'], function(angular) {

    angular.module('crmApp').controller('ChangePasswordCtrl', 
      function ($scope, Restangular, $location) {

        $scope.errors = {
        };
        
        $scope.initErrors = function(){
          $scope.errors = {
            newpassword: new Array(),
            newpassword2: new Array()
          };
        }
        
        $scope.account = {
          newpassword: '',
          newpassword2: ''
        };
      
        $scope.$watch('account.newpassword2', function(){
          if($scope.account.newpassword != $scope.account.newpassword2){
            $scope.initErrors();
            $scope.errors.newpassword[0] = 'Passwords do not match';
          }else if($scope.account.newpassword.length > 1 && $scope.account.newpassword.length < 5){
            $scope.initErrors();
            $scope.errors.newpassword[0] = 'Passwords length is too short';
          }else{
            delete $scope.errors;
          }
        });
        
        $scope.$watch('account.newpassword', function(){
          if($scope.account.newpassword == $scope.account.newpassword2 && $scope.account.newpassword.length > 5){
            delete $scope.errors;
          }
        });
        
        $scope.onSave = function(){
          Restangular.one('login').put($scope.account).then(function(){
            $location.path('/settings');
          }, function(output){
            $scope.errors = output.data;
          })
        };
      
        /**
         * Activate Settings menu
         */
        $scope.$emit('event:menuLinkActivate', 'Settings');
        
      });

  });
