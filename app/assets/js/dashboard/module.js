define([
  'angular',
  'angular-couch-potato',
  'angular-ui-router',
  'user/services'
], function (angular, couchPotato) {

  'use strict';

  var module = angular.module('app.dashboard', [
    'ui.router',
    'user.services'
  ]);

  couchPotato.configureApp(module);

  module.config(['$stateProvider', '$couchPotatoProvider', function($stateProvider, $couchPotatoProvider) {
    $stateProvider
      .state('app.dashboard', {
        url: '/',
        views: {
          "content@app": {
            controller: 'DashboardCtrl',
            templateUrl: '/assets/js/dashboard/dashboard.html',
            resolve: {
              deps: $couchPotatoProvider.resolveDependencies([
                'dashboard/DashboardCtrl'
              ]),
              user: ['userService', function(userService) {
                return userService.getAuthUser();
              }]
            }
          }
        },
        ncyBreadcrumb: {
          label: '<span class="fa fa-home"></span>'
        }
      });
  }]);

  module.run(['$couchPotato', function ($couchPotato) {
    module.lazy = $couchPotato;
  }]);

  return module;
});