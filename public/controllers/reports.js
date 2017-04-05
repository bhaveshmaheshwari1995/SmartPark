'use strict';
angular.module('apm.reports', ['ngRoute','ng-fusioncharts'])
.controller('reportsController', function($scope, $http, $stateParams, $state) {
	console.log('reports called');
    $scope.data = {}
    $scope.billingArray=[];

    var callback = function(){
        var orders = $scope.data;
        console.log('orders ',orders);
        var tempslotid='';
        if(orders.length != 0){
            orders.forEach(function(order) {
            
        });

        $scope.billingArray = tempFacility;
        var sum = 0;
        $scope.billingArray.forEach(function(entry) {
            sum = sum + (entry.hours);    
        });
        $scope.sum = sum*30;

        }


    }
    var getFacilityInfo = function(){
        $http.get(config.hostname+'/api/reports/'+$scope.fromDate+'/'+$scope.toDate)
        .then(function(response){
            console.log(response.data)
            if(response.data.success){
                console.log(response.data.orders);
                $scope.data = response.data.orders;
                //callback();
            }
        },function(response){
            console.log(response.data);
        });
    }

    $scope.submitDate = function(){
        console.log("aaya");
        $scope.fromDate = document.getElementById('fromDate').value;
        $scope.toDate = document.getElementById('toDate').value
        console.log($scope.fromDate);
        console.log("to "+$scope.toDate);
        getFacilityInfo();
    }

});