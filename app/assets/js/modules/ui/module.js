define([
  'angular',
  'angular-couch-potato',
  'angular-ui-router'
], function(angular, couchPotato){
  "use strict";

  var module = angular.module('app.ui', ['ui.router']);

  couchPotato.configureApp(module);

  module.config(['$stateProvider', '$couchPotatoProvider', function($stateProvider, $couchPotatoProvider){

    $stateProvider
      .state('app.ui', {
        abstract: true,
        ncyBreadcrumb: {
          label: 'UI Elements'
        }
      })
      .state('app.ui.grid', {
        url: '/ui/grid',
        views: {
          "content@app": {
            templateUrl: '/assets/js/modules/ui/grid.html'
          }
        },
        ncyBreadcrumb: {
          label: 'UI Elements',
          parent: 'app.dashboard'
        }
      })
      .state('app.ui.buttons', {
        url: '/ui/buttons',
        views: {
          "content@app": {
            templateUrl: '/assets/js/modules/ui/buttons.html'
          }
        },
        ncyBreadcrumb: {
          label: 'Buttons',
          parent: 'app.dashboard'
        }
      })
      .state('app.ui.typography', {
        url: '/ui/typography',
        views: {
          "content@app": {
            templateUrl: '/assets/js/modules/ui/typography.html'
          }
        },
        ncyBreadcrumb: {
          label: 'Typography',
          parent: 'app.dashboard'
        }
      })
      .state('app.ui.panels-wells', {
        url: '/ui/panelswells',
        views: {
          "content@app": {
            templateUrl: '/assets/js/modules/ui/panels-wells.html'
          }
        },
        ncyBreadcrumb: {
          label: 'Panels and Wells',
          parent: 'app.dashboard'
        }
      })
      .state('app.ui.notifications', {
        url: '/ui/notifications',
        views: {
          "content@app": {
            templateUrl: '/assets/js/modules/ui/notifications.html'
          }
        },
        ncyBreadcrumb: {
          label: 'Notifications',
          parent: 'app.dashboard'
        }
      });
  }]);

  module.run(['$couchPotato', function($couchPotato){
    module.lazy = $couchPotato;
  }]);

  return module;
});