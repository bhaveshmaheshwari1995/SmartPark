'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('apm', [
'ui.router',
'angularUtils.directives.dirPagination',
'apm.login',
'apm.dashboard',
'apm.reports',
'apm.monitor',
'apm.settings'
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
    url: '/monitor/:facility',
    templateUrl: './views/monitor.html',
    controller: 'monitorController'
  })
  .state('settings', {
    url: '/settings',
    templateUrl: './views/settings.html',
    controller: 'settingsController'
  })
  .state('about', {
    url: '/about',
    templateUrl: './views/about/aboutus.html'
  })
});

app.run(function($rootScope, $http, $state) {
      $rootScope.client ={}
      var getClientlist = function(){
        console.log('getting client data')
        $http.get(config.hostname+'/api/clients')
        .then(function(response){
            console.log(response.data);
            if(response.data.success){
                $rootScope.clientList = response.data.clients;
                //$rootScope.client = $rootScope.clientList[0]
                $rootScope.client = {clientId:"Aspire",defaultFacility:'A'}
            }
        },function(response){
            console.log(response.data);
        });
      }
      getClientlist();

      
      $rootScope.selectClient = function(client){
        $rootScope.client = client;
        $state.go('dashboard',{},{reload: 'dashboard'});
      }

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
    });
})

app.filter('unique', function() {
   return function(collection, keyname) {
      var output = [], 
          keys = [];

      angular.forEach(collection, function(item) {
          var key = item[keyname];
          if(keys.indexOf(key) === -1) {
              keys.push(key);
              output.push(item);
          }
      });

      return output;
   };
});
