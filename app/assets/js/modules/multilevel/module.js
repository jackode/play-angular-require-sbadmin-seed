define([
  'angular',
  'angular-couch-potato',
  'angular-ui-router'
], function (angular, couchPotato) {
  "use strict";

  var module = angular.module('app.multilevel', ['ui.router']);

  couchPotato.configureApp(module);

  module.config(['$stateProvider', function ($stateProvider) {

    $stateProvider
      .state('app.level', {
        url: '/secondlevel',
        data: {
          title: 'Second Level'
        },
        views: {
          "content@app": {
            template: '<h1>This is a second level page.</h1>'
          }
        },
        ncyBreadcrumb: {
          label: 'Second Level',
          parent: 'app.dashboard'
        }
      })
      .state('app.level.level', {
        url: '/thirdlevel',
        data: {
          title: 'Third Level'
        },
        views: {
          "content@app": {
            template: '<h1>This is a third level page.</h1>'
          }
        },
        ncyBreadcrumb: {
          label: 'Third Level',
          parent: 'app.level'
        }
      });

  }]);

  module.run(['$couchPotato', function ($couchPotato) {
    module.lazy = $couchPotato;
  }]);

  return module;

});