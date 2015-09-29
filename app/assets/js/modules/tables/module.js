define([
  'angular',
  'angular-couch-potato',
  'angular-ui-router'
], function (angular, couchPotato) {
  "use strict";

  var module = angular.module('app.tables', ['ui.router']);

  couchPotato.configureApp(module);

  module.config(['$stateProvider', '$couchPotatoProvider', function ($stateProvider, $couchPotatoProvider) {

    $stateProvider
      .state('app.tables', {
        url: '/tables',
        data: {
          title: 'Tables'
        },
        views: {
          "content@app": {
            templateUrl: '/assets/js/modules/tables/tables.html'
          }
        },
        ncyBreadcrumb: {
          label: 'Tables',
          parent: 'app.dashboard'
        }
      });

  }]);

  module.run(['$couchPotato', function ($couchPotato) {
    module.lazy = $couchPotato;
  }]);

  return module;

});