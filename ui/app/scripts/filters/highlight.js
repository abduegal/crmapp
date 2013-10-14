define([ 'angular', 'lodash'], function(angular, _) {

  /**
   * Wraps the
   * @param text {string} haystack to search through
   * @param search {string} needle to search for
   * @param [caseSensitive] {boolean} optional boolean to use case-sensitive searching
   */

  return angular.module('crmApp').filter('highlight', function () {
    return function (text, search, caseSensitive) {
      if (search || angular.isNumber(search)) {
        text = text.toString();
        search = search.toString();
        if (caseSensitive) {
          return text.split(search).join('<strong><u>' + search + '</u></strong>');
        } else {
          return text.replace(new RegExp(search, 'gi'), '<strong><u>$&</u></strong>');
        }
      } else {
        return text;
      }
    };
  });
  
});