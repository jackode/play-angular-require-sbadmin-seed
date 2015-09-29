/** Common helpers */
define(['angular', 'angular-couch-potato'], function(angular, couchPotato) {
  'use strict';

  var module = angular.module('common.helper', []);

  couchPotato.configureApp(module);

  module.registerService('helper', function() {
    return {
      sayHi: function() {
        return 'hi';
      }
    };
  });

  module.run(['$couchPotato', function ($couchPotato) {
    module.lazy = $couchPotato;
  }]);

  return module;
});
