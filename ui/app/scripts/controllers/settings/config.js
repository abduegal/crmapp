define([ 'angular', 'app',
         'controllers/SaveForm', 'controllers/UpdateForm', 'controllers/ViewForm',
         'controllers/settings/ChangePassword', 'controllers/settings/Email'],
    function(angular) {
      'use strict';
      
      return angular.module('crmApp')
      .config(function ($routeProvider) {
        $routeProvider
          .when('/settings/account/add', {
            templateUrl: 'views/settings/AddAccount.html',
            controller: 'SaveFormCtrl'
          })
          .when('/settings/account/view', {
            templateUrl: 'views/settings/ViewAccount.html',
            controller: 'ViewFormCtrl'
          })
          .when('/settings/account/edit/:id', {
            templateUrl: 'views/settings/AddAccount.html',
            controller: 'UpdateFormCtrl'
          })
          .when('/settings/account/changepassword', {
            templateUrl: 'views/settings/ChangePassword.html',
            controller: 'ChangePasswordCtrl'
          })
          .when('/settings/product/add', {
            templateUrl: 'views/settings/AddProduct.html',
            controller: 'SaveFormCtrl'
          })
          .when('/settings/product/view', {
            templateUrl: 'views/settings/ViewProduct.html',
            controller: 'ViewFormCtrl'
          })
          .when('/settings/product/edit/:id', {
            templateUrl: 'views/settings/AddProduct.html',
            controller: 'UpdateFormCtrl'
          })
          .when('/settings/supplier/add', {
            templateUrl: 'views/settings/AddSupplier.html',
            controller: 'SaveFormCtrl'
          })
          .when('/settings/supplier/view', {
            templateUrl: 'views/settings/ViewSupplier.html',
            controller: 'ViewFormCtrl'
          })
          .when('/settings/supplier/edit/:id', {
            templateUrl: 'views/settings/AddSupplier.html',
            controller: 'UpdateFormCtrl'
          })
          .when('/settings/company/:id', {
            templateUrl: 'views/settings/Company.html',
            controller: 'UpdateFormCtrl'
          })
          .when('/settings/email/:id', {
            templateUrl: 'views/settings/Email.html',
            controller: 'UpdateFormCtrl'
          });
      })
      
    });