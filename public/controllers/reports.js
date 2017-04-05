'use strict';
angular.module('apm.reports', ['ngRoute','ng-fusioncharts'])
.controller('reportsController', function($scope, $http, $stateParams, $state) {
	console.log('reports called');
    $scope.data = {}
    $scope.billingArray=[];
    var hour = 0;
    var callback = function(){
        var orders = $scope.data;
        var tempFacilityArray=[];
        var hour = 0;
        if(orders.length != 0) {
            orders.forEach(function(order) {
				tempFacilityArray.push(order.facilityId);            
			});
			tempFacilityArray = _.uniq(tempFacilityArray);
			tempFacilityArray.forEach(function(entry){
				hour = 0;
				orders.forEach(function(order) {
					if(entry == order.facilityId){
						if(order.outTime && order.inTime){
							var occHours = (new Date(order.outTime) - new Date(order.inTime))/(60*60*1000)
							hour = hour + occHours;
						}
					}
				});
				$scope.billingArray.push({'facilityId':entry,'hours':hour});
			})
		}
    }
    var getFacilityInfo = function(){
        $http.get(config.hostname+'/api/reports/'+$scope.fromDate+'/'+$scope.toDate)
        .then(function(response){
            if(response.data.success){
                console.log(response.data.orders);
                $scope.data = response.data.orders;
                callback();
            }
        },function(response){
            console.log(response.data);
        });
    }

    $scope.submitDate = function(){
        $scope.fromDate = document.getElementById('fromDate').value;
        $scope.toDate = document.getElementById('toDate').value
        getFacilityInfo();
    }

});