'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.home',
    'myApp.graphs',
  'myApp.version',
    'ngMaterial',
    'md.data.table',
    'demoApp',
    'chart.js',
    'myApp.graphs'

]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/home'});
}]);
