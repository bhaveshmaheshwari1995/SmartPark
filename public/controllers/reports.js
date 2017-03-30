'use strict';
angular.module('apm.reports', ['ngRoute','ng-fusioncharts'])
.controller('reportsController', function($scope, $http, $stateParams, $state) {
	console.log('reports called');

    $scope.submitDate = function(){
        console.log("aaya");
        $scope.fromDate = document.getElementById('fromDate').value;
        $scope.toDate = document.getElementById('toDate').value
        console.log("from "+$scope.fromDate+" to "+$scope.toDate);
        
    }



});