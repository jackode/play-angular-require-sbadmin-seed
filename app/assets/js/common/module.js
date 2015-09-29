define([
  'angular',
  'angular-couch-potato',
  './services/helper', 
  './services/playRoutes', 
  './filters', 
  './directives/example'
], function(angular, couchPotato) {
  'use strict';

  var module = angular.module('app.common', [
    'common.helper', 
    'common.playRoutes', 
    'common.filters',
    'common.directives.example'
  ]);

  couchPotato.configureApp(module);

  module.run(['$couchPotato', function ($couchPotato) {
    module.lazy = $couchPotato;
  }]);

  return module;
});
