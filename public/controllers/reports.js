'use strict';
angular.module('apm.reports', ['ngRoute','ng-fusioncharts'])
.controller('reportsController', function($scope, $http, $stateParams, $state) {
	console.log('reports called');

    $scope.submitDate = function(){
        console.log("aaya");
        $scope.fromDate = document.getElementById('fromDate').value;
        $scope.toDate = document.getElementById('toDate').value
        console.log("from "+$scope.fromDate);
        console.log("to "+$scope.toDate);
    }

    $scope.data = [{facility:"A",occupiedHours:10},
                {facility:"B",occupiedHours:13},
                {facility:"C",occupiedHours:20},
                {facility:"D",occupiedHours:12},
                {facility:"E",occupiedHours:15}];

    var sum = 0;
    $scope.data.forEach(function(entry) {
        sum = sum + (entry.occupiedHours);    
    });
    $scope.sum = sum*10;
});