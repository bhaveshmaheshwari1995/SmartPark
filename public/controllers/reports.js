'use strict';
angular.module('apm.reports', ['ngRoute','ng-fusioncharts'])
.controller('reportsController', function($scope, $http, $stateParams, $state) {
	console.log('reports called');
    $scope.data = {}
    $scope.billingArray=[];

    var callback = function(){
        var tempFacility = []
        var parkingSlots = $scope.data.parkingSlots;
        var orders = $scope.data.orders;
        console.log('parkingSlots ',parkingSlots);
        console.log('orders ',orders);
        var tempslotid='';
        if(orders.length != 0){
            orders.forEach(function(order) {
            // tempslotid = order.slotId;
            parkingSlots.forEach(function(parkingSlot) {
                if(parkingSlot.slotId == order.slotId) {
                    var occHours = (new Date(order.outTime) - new Date(order.inTime))/(60*60*1000);
                    if(tempFacility.length==0){
                        tempFacility.push({facility:parkingSlot.facilityId,hours:occHours})
                    }else{
                        tempFacility.forEach(function(tempFac){
                        if(tempFac.facility == parkingSlot.facilityId){
                            tempFac.hours = tempFac.hours + occHours;
                        }
                        else{
                            tempFacility.push({facility:parkingSlot.facilityId,hours:occHours})
                            //console.log(tempFacility)
                        }
                    });    
                    }
                }
            });
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
                console.log(response.data.data);
                $scope.data = response.data.data;
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