define([
  'angular',
  'angular-couch-potato',
  'angular-ui-router'
], function (angular, couchPotato) {
  "use strict";

  var module = angular.module('app.charts', ['ui.router']);

  couchPotato.configureApp(module);

  module.config(['$stateProvider', '$couchPotatoProvider', function ($stateProvider, $couchPotatoProvider) {

    $stateProvider
      .state('app.charts', {
        abstract: true,
        ncyBreadcrumb: {
          label: 'Charts'
        }
      })
      .state('app.charts.flot', {
        url: '/charts/flot',
        views: {
          "content@app": {
            templateUrl: '/assets/js/modules/charts/flot.html',
            resolve: {
              deps: $couchPotatoProvider.resolveDependencies([
                'modules/charts/FlotCtrl'
              ])
            }
          }
        },
        ncyBreadcrumb: {
          label: 'Flot Charts',
          parent: 'app.dashboard'
        }
      })
      .state('app.charts.morris', {
        url: '/charts/morris',
        views: {
          "content@app": {
            templateUrl: '/assets/js/modules/charts/morris.html',
            resolve: {
              deps: $couchPotatoProvider.resolveDependencies([
                'modules/charts/MorrisCtrl'
              ])
            }
          }
        },
        ncyBreadcrumb: {
          label: 'Morris Charts',
          parent: 'app.dashboard'
        }
      });

  }]);

  module.run(['$couchPotato', function ($couchPotato) {
    module.lazy = $couchPotato;
  }]);

  return module;

});
