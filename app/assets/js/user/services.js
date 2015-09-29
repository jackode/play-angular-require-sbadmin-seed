/**
 * User service, exposes user model to the rest of the app.
 */
define([
  'angular',
  'angular-couch-potato',
  'angular-cookies',
  'common/module',
  'user/module'
], function (angular, couchPotato) {
  'use strict';

  var module = angular.module('user.services', [
    'ngCookies',
    'app.common'
  ]);

  couchPotato.configureApp(module);
  
  module.registerFactory('userService', ['$http', '$q', 'playRoutes', '$cookies', '$log', function ($http, $q, playRoutes, $cookies, $log) {
    var user, token = $cookies['XSRF-TOKEN'];

    /* If the token is assigned, check that the token is still valid on the server */
    if (token) {
      $log.info('Restoring user from cookie...');
      playRoutes.controllers.Users.authUser().get()
        .success(function (data) {
          $log.info('Welcome back, ' + data.name);
          user = data;
        })
        .error(function () {
          $log.info('Token no longer valid, please log in.');
          token = undefined;
          delete $cookies['XSRF-TOKEN'];
          return $q.reject("Token invalid");
        });
    }

    /**
     * Returns the user that is currently logged in. If the token is valid the promise is
     * successful. It is rejected otherwise.
     */
    function getAuthUser() {
      var deferred = $q.defer();
      playRoutes.controllers.Users.authUser().get()
        .success(function (data) {
          user = data;
          deferred.resolve(user);
        })
        .error(function () {
          token = undefined;
          user = undefined;
          deferred.reject();
        });
      return deferred.promise;
    }

    return {
      loginUser: function (credentials) {
        return playRoutes.controllers.Application.login().post(credentials).then(function (response) {
          // return promise so we can chain easily
          token = response.data.token;
          return playRoutes.controllers.Users.authUser().get();
        }).then(function (response) {
          user = response.data;
          return user;
        });
      },
      logout: function () {
        // Logout on server in a real app
        delete $cookies['XSRF-TOKEN'];
        token = undefined;
        user = undefined;
        return playRoutes.controllers.Application.logout().post().then(function () {
          $log.info("Good bye");
        });
      },
      getUser: function () {
        return user;
      },
      getAuthUser: getAuthUser
    };
  }]);

  /**
   * If the current route does not resolve, go back to the start page.
   */
  module.run(['$rootScope', '$location', function ($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function (/*e, next, current*/) {
      $location.path('/');
    });
  }]);

  module.run(['$couchPotato', function ($couchPotato) {
    module.lazy = $couchPotato;
  }]);

  return module;
});
