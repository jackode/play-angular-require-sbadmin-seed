define(['home/module', 'jquery', 'metis-menu'], function (module, $) {
  'use strict';

  return module.registerDirective('sideMenu', function () {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        if ($.fn.metisMenu) {
          $('#side-menu').metisMenu();
        }

        //Loads the correct sidebar on window load,
        //collapses the sidebar on window resize.
        // Sets the min-height of #page-wrapper to window size
        $(window).bind("load resize", function() {
          var topOffset = 50;
          var width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;
          if (width < 768) {
            $('div.navbar-collapse').addClass('collapse');
            topOffset = 100; // 2-row-menu
          } else {
            $('div.navbar-collapse').removeClass('collapse');
          }

          var height = (this.window.innerHeight > 0) ? this.window.innerHeight : this.screen.height;
          height = height - topOffset;
          if (height < 1) {
            height = 1;
          }
          if (height > topOffset) {
            $("#page-wrapper").css("min-height", (height) + "px");
          }
        });
      }
    };
  });

});

//define(['angular', 'metis-menu'], function (angular) {
//  'use strict';
//
//  return angular.module('app.constants', [])
//      .constant('CONFIG', {});
//});

//define([
//  'angular',
//  'jquery',
//  'metis-menu'
//], function (module, $) {
//
//    'use strict';
//
//    return module.registerDirective('sideMenu', function () {
//        return {
//            restrict: 'A',
//            link: function (scope, element) {
//
//              //$('#side-menu').metisMenu();
//              console.log('#side-menu');
//
              //Loads the correct sidebar on window load,
              //collapses the sidebar on window resize.
              // Sets the min-height of #page-wrapper to window size
              //$(window).bind("load resize", function() {
              //  var topOffset = 50;
              //  var width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;
              //  if (width < 768) {
              //    $('div.navbar-collapse').addClass('collapse');
              //    topOffset = 100; // 2-row-menu
              //  } else {
              //    $('div.navbar-collapse').removeClass('collapse');
              //  }
              //
              //  var height = (this.window.innerHeight > 0) ? this.window.innerHeight : this.screen.height;
              //  height = height - topOffset;
              //  if (height < 1) {
              //    height = 1;
              //  }
              //  if (height > topOffset) {
              //    $("#page-wrapper").css("min-height", (height) + "px");
              //  }
              //});
//
//                // if ($.fn.easyPieChart) {
//
//                //     $('.easy-pie-chart').each(function() {
//                //         var $this = $(this),
//                //             barColor = $this.css('color') || $this.data('pie-color'),
//                //             trackColor = $this.data('pie-track-color') || 'rgba(0,0,0,0.04)',
//                //             size = parseInt($this.data('pie-size')) || 25;
//
//                //         $this.easyPieChart({
//
//                //             barColor : barColor,
//                //             trackColor : trackColor,
//                //             scaleColor : false,
//                //             lineCap : 'butt',
//                //             lineWidth : parseInt(size / 8.5),
//                //             animate : 1500,
//                //             rotate : -90,
//                //             size : size,
//                //             onStep: function(from, to, percent) {
//                //                 $(this.el).find('.percent').text(Math.round(percent));
//                //             }
//
//                //         });
//
//                //         $this = null;
//                //     });
//
//                // } // end if
//            }
//        }
//    });
//});


// (function (factory) {
//   if (typeof define === 'function' && define.amd) {
//     // AMD. Register as an anonymous module.
//     define(['jquery'], factory);
//   } else if (typeof exports === 'object') {
//     // Node/CommonJS
//     factory(require('jquery'));
//   } else {
//     // Browser globals
//     factory(jQuery);
//   }
// } (function ($) {
//   'use strict';

//   $('#side-menu').metisMenu();

//   //Loads the correct sidebar on window load,
//   //collapses the sidebar on window resize.
//   // Sets the min-height of #page-wrapper to window size
//   $(window).bind("load resize", function() {
//     var topOffset = 50;
//     var width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;
//     if (width < 768) {
//       $('div.navbar-collapse').addClass('collapse');
//       topOffset = 100; // 2-row-menu
//     } else {
//       $('div.navbar-collapse').removeClass('collapse');
//     }

//     var height = (this.window.innerHeight > 0) ? this.window.innerHeight : this.screen.height;
//     height = height - topOffset;
//     if (height < 1) {
//       height = 1;
//     }
//     if (height > topOffset) {
//       $("#page-wrapper").css("min-height", (height) + "px");
//     }
//   });
  
// }))



// var app=angular.module('App', []);
// app.directive('resize', ['$window', function($window) {
//   return {
//     link: function(scope, elem, attrs) {

      
      
//       scope.onResize = function() {
//         var header = document.getElementsByTagName('header')[0];
//         elem.windowHeight = $window.innerHeight - header.clientHeight;
//         $(elem).height(elem.windowHeight);
//       }
//       scope.onResize();

//       angular.element($window).bind('load resize', function() {
//         scope.onResize();
//         scope.apply();
//       })
//     }
//   }
// }])