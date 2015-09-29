define(['user/module'], function (module) {

  'use strict';

  return module.registerController('LoginCtrl', ['$scope', '$location', 'userService', function ($scope, $location, userService) {
    $scope.credentials = {
      email: 'guest@email.com',
      password: 'password'
    };

    $scope.login = function(credentials) {
      userService.loginUser(credentials).then(function(/*user*/) {
        $location.path('/');
      });
    };
  }]);

});