'use strict';
define([ 'angular'], function(angular) {
  
  angular.module('crmApp')
    .directive('formInput', function($compile) {
      return {
          restrict: 'E',
          link: function(scope, element, attrs)
          {
              var type = attrs.type || 'text';
              var required = attrs.hasOwnProperty('required') ? "required='required'" : "";
              var label = attrs.label;
              if(required){
                label += '<span class="text-danger"><strong> *</strong></span>';
              }
              var htmlText = '<div class="form-group" ng-class="{error: errors.'+attrs.formId+'}">' +
                  '<label class="col-lg-4 control-label" for="' + attrs.formId + '">' + label + '</label>' +
                    '<div class="col-lg-8">'+
                    '<input type="' + type + '" ng-model="'+attrs.target+'.'+attrs.formId+'" ng-disabled="'+attrs.disabled+'" '+
                           'class="form-control '+attrs.fclass+'" id="' + attrs.formId + '" name="' + attrs.formId + '" ' + required + '>' +
                    '<span class="help-inline">{{errors.'+attrs.formId+'.0}}</span>' +
                    '</div>'+
                  '</div>',
              newEl = $compile(htmlText)(scope)[0];

              element[0].innerHTML = '';
              element[0].appendChild(newEl);
          }
      }
  });
  
});