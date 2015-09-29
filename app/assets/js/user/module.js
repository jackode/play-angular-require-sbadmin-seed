define([
  'angular',
  'angular-couch-potato',
  'angular-ui-router'
  //,'./services'
  //,'common/module'
], function (angular, couchPotato) {
  'use strict';

  var module = angular.module('app.user', [
    'ui.router'
    //,'user.services'
    //,'app.common'
  ]);

  couchPotato.configureApp(module);

  module.config(['$stateProvider', '$couchPotatoProvider', function($stateProvider, $couchPotatoProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        views: {
          root: {
            controller: 'LoginCtrl',
            templateUrl: '/assets/js/user/login.html',
            resolve: {
              deps: $couchPotatoProvider.resolveDependencies([
                'user/LoginCtrl',
                'user/services'
              ])
            }
          }
        },
        data:{
          title: 'Login'
        }
      });
  }]);

  module.run(['$couchPotato', function ($couchPotato) {
    module.lazy = $couchPotato;
  }]);

  return module;
});