define([
  'angular',
  'angular-couch-potato',
  'angular-ui-router'
], function (angular, couchPotato) {
  "use strict";

  var module = angular.module('app.forms', ['ui.router']);

  couchPotato.configureApp(module);

  module.config(['$stateProvider', '$couchPotatoProvider', function ($stateProvider, $couchPotatoProvider) {

    $stateProvider
      .state('app.forms', {
        url: '/forms',
        data: {
          title: 'Forms'
        },
        views: {
          "content@app": {
            templateUrl: '/assets/js/modules/forms/forms.html'
          }
        },
        ncyBreadcrumb: {
          label: 'Forms',
          parent: 'app.dashboard'
        }
      });

  }]);

  module.run(['$couchPotato', function ($couchPotato) {
    module.lazy = $couchPotato;
  }]);

  return module;

});
