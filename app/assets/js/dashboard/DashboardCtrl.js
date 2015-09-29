define(['dashboard/module'], function(module) {
  'use strict';

  /**
   * user is not a service, but stems from userResolve (Check ../user/services.js) object used by dashboard.routes.
   */
  return module.registerController('DashboardCtrl', ['$scope', 'user', function ($scope, user) {
    $scope.user = user;
  }]);

});
