/** Common filters. */
define(['angular', 'angular-couch-potato'], function(angular, couchPotato) {
  'use strict';

  var module = angular.module('common.filters', []);
  /**
   * Extracts a given property from the value it is applied to.
   * {{{
   * (user | property:'name')
   * }}}
   */
  module.filter('property', ['value', 'property', function(value, property) {
    if (angular.isObject(value)) {
      if (value.hasOwnProperty(property)) {
        return value[property];
      }
    }
  }]);

  couchPotato.configureApp(module);

  module.run(['$couchPotato', function ($couchPotato) {
    module.lazy = $couchPotato;
  }]);

  return module;
});
