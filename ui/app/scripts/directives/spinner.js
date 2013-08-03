'use strict';
define([ 'angular', 'spinjs'], function(angular, spinjs) {
  
  return angular.module('crmApp')
  .directive('usSpinner', function ($window) {
    return function (scope, element, attr) {
      scope.spinner = null;
      scope.$watch(attr.usSpinner, function (options) {
        if (scope.spinner) {
          scope.spinner.stop();
        }
        options = {
          lines: 7, // The number of lines to draw
          length: 10, // The length of each line
          width: 6, // The line thickness
          radius: 15, // The radius of the inner circle
          corners: 0.1, // Corner roundness (0..1)
          rotate: 53, // The rotation offset
          direction: 1, // 1: clockwise, -1: counterclockwise
          color: '#033C73', // #rgb or #rrggbb
          speed: 1.8, // Rounds per second
          trail: 50, // Afterglow percentage
          shadow: false, // Whether to render a shadow
          hwaccel: false, // Whether to use hardware acceleration
          className: 'spinner', // The CSS class to assign to the spinner
          zIndex: 2e9, // The z-index (defaults to 2000000000)
          top: 'auto', // Top position relative to parent in px
          left: 'auto' // Left position relative to parent in px
        };
        scope.spinner = new $window.Spinner(options);
        scope.spinner.spin(element[0]);
      }, true);
    };
  });
  
});