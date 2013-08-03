require.config({
  paths : {
    angular : '../components/angular/angular',
    angularresource : '../components/angular-resource/angular-resource',
    json : '../components/json3/lib/json3',
    lodash: '../components/lodash/lodash',
    spinjs: '../components/spinjs/spin',
    jquery: '../components/jquery/jquery'
  },
  baseUrl : 'scripts',
  shim : {
    'angular' : {
      'exports' : 'angular'
    }
  },
  priority : [ 'angular' ]
});

require([ 'angular', 'app', 'config'], function(angular, app) {
  'use strict';
  angular.bootstrap(document, [ 'crmApp' ]);
});