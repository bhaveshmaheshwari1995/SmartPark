'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('apm', [
  'ui.router',
  'apm.login',
  'apm.dashboard',
  'apm.reports',
  'apm.monitor'
]);
app.config( function($locationProvider, $stateProvider, $urlRouterProvider) {
	
  $urlRouterProvider.otherwise('/dashboard');
  
  $stateProvider
  .state('dashboard', {
    url: '/dashboard',
    templateUrl: './views/dashboard.html',
    controller: 'dashboardController'
  })
  .state('login', {
    url: '/login',
    templateUrl: './views/login.html',
    controller: 'loginController'
  })
  .state('reports', {
    url: '/reports',
    templateUrl: './views/reports.html',
    controller: 'reportsController'
  })
  .state('monitor', {
    url: '/monitor',
    templateUrl: './views/monitor.html',
    controller: 'monitorController'
  })
});

app.run(function($rootScope, $state, $location) {
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
    });
})
