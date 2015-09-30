/**
 * The app module, as both AngularJS as well as RequireJS module.
 * Splitting an app in several Angular modules serves no real purpose in Angular 1.2.
 * (Hopefully this will change in the near future.)
 * Splitting it into several RequireJS modules allows async loading. We cannot take full advantage
 * of RequireJS and lazy-load stuff because the angular modules have their own dependency system.
 */
define([
  'angular',
  'angular-couch-potato',
  'angular-ui-router',
  'angular-bootstrap',
  'angular-sanitize',
  'angular-animate',
  'angular-breadcrumb'
], function (angular, couchPotato) {
  'use strict';

  // We must already declare most dependencies here (except for common), or the submodules' routes
  // will not be resolved
  var app = angular.module('app', [
    'scs.couch-potato',
    'ui.router',
    'ui.bootstrap',
    'ngSanitize',
    'ngAnimate',
    'ncy-angular-breadcrumb',
    'app.constants',
    'app.common',
    'app.user',
    'app.dashboard',
    'app.home',
    'app.charts',
    'app.forms',
    'app.tables',
    'app.ui',
    'app.multilevel'
  ]);

  // setup the registerXXX functions (registerController, registerDirective, ...)
  couchPotato.configureApp(app);

  //app.config(['$provide', '$httpProvider', function ($provide, $httpProvider) {
  //
  //  // Intercept http calls.
  //  $provide.factory('ErrorHttpInterceptor', ['$q', function ($q) {
  //    var errorCounter = 0;
  //    function notifyError(rejection){
  //      console.log(rejection);
  //      $.bigBox({
  //         title: rejection.status + ' ' + rejection.statusText,
  //         content: rejection.data,
  //         color: "#C46A69",
  //         icon: "fa fa-warning shake animated",
  //         number: ++errorCounter,
  //         timeout: 6000
  //      });
  //    }
  //
  //    return {
  //      // On request failure
  //      requestError: function (rejection) {
  //        // show notification
  //        notifyError(rejection);
  //
  //        // Return the promise rejection.
  //        return $q.reject(rejection);
  //      },
  //
  //      // On response failure
  //      responseError: function (rejection) {
  //        // show notification
  //        notifyError(rejection);
  //        // Return the promise rejection.
  //        return $q.reject(rejection);
  //      }
  //    };
  //  }]);
  //
  //  // Add the interceptor to the $httpProvider.
  //  $httpProvider.interceptors.push('ErrorHttpInterceptor');
  //
  //}]);

  app.config(['$locationProvider', function ($locationProvider) {
    if(window.history && history.pushState) {
      $locationProvider.html5Mode(false);
    }
  }]);

  app.config(['$breadcrumbProvider', function ($breadcrumbProvider) {
    $breadcrumbProvider.setOptions({
      prefixStateName: 'app',
      templateUrl: 'assets/js/home/breadcrumb.tpl.html'
    });
  }]);

  app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.headers.common = {
      'X-Requested-With' : 'XMLHttpRequest'
    };
  }]);

  app.run(function($rootScope) {
    $rootScope.$on('$routeChangeError', function(event, current, previous, rejection) {
      console.log('failed to change route', event, current, previous, rejection);
    });
  });

  // For debugging angular-ui-router
  // http://stackoverflow.com/questions/20745761/what-is-the-angular-ui-router-lifecycle-for-debugging-silent-errors
  //app.run(['$rootScope', function($rootScope) {
  //
  //   $rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams){
  //     console.log('$stateChangeStart to '+toState.to+'- fired when the transition begins. toState,toParams : \n',toState, toParams);
  //   });
  //   $rootScope.$on('$stateChangeError',function(event, toState, toParams, fromState, fromParams){
  //     console.log('$stateChangeError - fired when an error occurs during transition.');
  //     console.log(arguments);
  //   });
  //   $rootScope.$on('$stateChangeSuccess',function(event, toState, toParams, fromState, fromParams){
  //     console.log('$stateChangeSuccess to '+toState.name+'- fired once the state transition is complete.');
  //   });
  //   // $rootScope.$on('$viewContentLoading',function(event, viewConfig){
  //   //   // runs on individual scopes, so putting it in "run" doesn't work.
  //   //   console.log('$viewContentLoading - view begins loading - dom not rendered',viewConfig);
  //   // });
  //   $rootScope.$on('$viewContentLoaded',function(event){
  //     console.log('$viewContentLoaded - fired after dom rendered',event);
  //   });
  //   $rootScope.$on('$stateNotFound',function(event, unfoundState, fromState, fromParams){
  //     console.log('$stateNotFound '+unfoundState.to+'  - fired when a state cannot be found by its name.');
  //     console.log(unfoundState, fromState, fromParams);
  //   });
  //
  //}]);

  app.run(['$couchPotato', '$rootScope', '$state', '$stateParams', function ($couchPotato, $rootScope, $state, $stateParams) {
    // assign app.lazy so the registerXXX functions work
    app.lazy = $couchPotato;
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
  }]);

  return app;
});
