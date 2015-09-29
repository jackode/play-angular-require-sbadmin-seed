define(['home/module'], function (module, helper) {

  'use strict';

  return module.registerController('HomeCtrl', ['$rootScope', 'helper', function ($rootScope, helper) {
    /** Controls the index page */
    console.log(helper.sayHi());
    $rootScope.pageTitle = 'Welcome';
  }]);

});