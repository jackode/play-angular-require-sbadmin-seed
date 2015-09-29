/**
 * A common directive.
 * It would also be ok to put all directives into one file, or to define one RequireJS module
 * that references them all.
 */
define(['angular', 'angular-couch-potato'], function(angular, couchPotato) {
  'use strict';

  var module = angular.module('common.directives.example', []);

  couchPotato.configureApp(module);

  module.registerDirective('example', ['$log', function($log) {
    return {
      restrict: 'AE',
      link: function(/*scope, el, attrs*/) {
        $log.info('Here prints the example directive from /common/directives.');
      }
    };
  }]);

  module.run(['$couchPotato', function ($couchPotato) {
    module.lazy = $couchPotato;
  }]);

  return module;
});
