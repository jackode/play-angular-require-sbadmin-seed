// `main.js` is the file that sbt-web will use as an entry point
(function (requirejs) {
  'use strict';

  // -- RequireJS config --
  requirejs.config({
    // Packages = top-level folders; loads a contained file named 'main.js"
    //packages: ['common', 'home', 'user', 'dashboard', 'forms'],
    paths: {
      'jsRoutes': '/jsroutes',

      'requirejs': '../lib/requirejs/require',
      'jquery': '../lib/jquery/jquery',
      'angular': '../lib/angularjs/angular',
      'angular-route': '../lib/angularjs/angular-route',
      'angular-cookies': '../lib/angularjs/angular-cookies',
      'angular-bootstrap': '../lib/angular-ui-bootstrap/ui-bootstrap-tpls.min',
      'angular-ui-router': '../lib/angular-ui-router/angular-ui-router.min',
      'angular-couch-potato': '../plugins/angular-couch-potato/angular-couch-potato',
      'angular-sanitize': '../lib/angular-sanitize/angular-sanitize.min',
      'angular-animate': '../lib/angular-animate/angular-animate.min',
      'angular-breadcrumb': '../plugins/angular-breadcrumb/angular-breadcrumb',
      'bootstrap': '../lib/bootstrap/js/bootstrap',

      'datatables': '../plugins/dataTables/jquery.dataTables',
      'datatables-bootstrap': '../plugins/dataTables/dataTables.bootstrap',
      'domReady': '../plugins/requirejs-domready/domReady',
      'flot': '../plugins/flot/jquery.flot',
      'flot-resize': '../plugins/flot/jquery.flot.resize',
      'flot-pie': '../plugins/flot/jquery.flot.pie',
      'flot-tooltip': '../plugins/flot/jquery.flot.tooltip.min',
      'metis-menu': '../plugins/metisMenu/metisMenu.min',
      'raphael': '../plugins/morris/raphael.min',
      'morris': '../plugins/morris/morris.min'

    },
    shim: {
      'jsRoutes': {
        deps: [],
        // it's not a RequireJS module, so we have to tell it what var is returned
        exports: 'jsRoutes'
      },

      // Hopefully this all will not be necessary but can be fetched from WebJars in the future
      'angular': { deps: ['jquery'], exports: 'angular' },
      'angular-route': ['angular'],
      'angular-cookies': ['angular'],
      'angular-bootstrap': ['angular'],
      'angular-ui-router': ['angular'],
      'angular-couch-potato': ['angular'],
      'angular-sanitize': ['angular'],
      'angular-animate': ['angular'],
      'angular-breadcrumb': ['angular', 'angular-ui-router'],
      'bootstrap': ['jquery'],

      'datatables': ['jquery'],
      'datatables-bootstrap': ['datatables'],
      'flot': ['jquery'],
      'flot-resize': ['flot'],
      'flot-pie': ['flot'],
      'flot-tooltip': ['flot'],
      'metis-menu': ['jquery'],
      'morris': ['raphael']
    }
  });

  requirejs.onError = function (err) {
    console.log(err);
  };

  /*
   * This block of code is necessary to defer angular's bootstrap phase.
   * http://code.angularjs.org/1.3.6/docs/guide/bootstrap#overview_deferred-bootstrap
   */
  // Load the app. This is kept minimal so it doesn't need much updating.
  require([
    'angular',
    'jquery',
    'bootstrap',
    './app',
    './includes'
  ], function (angular) {

      // You can place operations that need to initialize prior to app start here
      // using the `run` function on the top-level module

      // as script is at the very bottom of the page no waiting for domReady
      angular.bootstrap(document, ['app']);
    }
  );
})(requirejs);
