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
                    console.log(parkingSlot.slotId)
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
                            console.log(tempFacility)
                        }
                    });    
                    }
                }
            });
        });
        console.log(tempFacility)
        $scope.billingArray = tempFacility;
        var sum = 0;
        $scope.billingArray.forEach(function(entry) {
            sum = sum + (entry.hours);    
        });
        $scope.sum = sum*30;

        }


    }
    var getFacilityInfo = function(){
        $http.get('http://54.190.10.153:4200/api/reports/'+$scope.fromDate+'/'+$scope.toDate)
        .then(function(response){
            if(response.data.success){
                console.log(response);
                $scope.data = response.data.data;
                console.log(response.data.data);
                callback();
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

/*    $scope.data = [{facility:"A",occupiedHours:10},
                {facility:"B",occupiedHours:13},
                {facility:"C",occupiedHours:20},
                {facility:"D",occupiedHours:12},
                {facility:"E",occupiedHours:15}];

    var sum = 0;
    $scope.data.forEach(function(entry) {
        sum = sum + (entry.occupiedHours);    
    });
    $scope.sum = sum*10;*/

    /*var data = {
  "success": true,
  "data": {
    "parkingSlots": [
      {
        "_id": "58dea585c96f11232e2c9763",
        "name": "B1",
        "slotId": "S1",
        "facilityId": "B",
        "clientId": "Aspire",
        "regNo": null,
        "inTime": null,
        "status": "available",
        "createdAt": "2017-03-31T18:52:53.180Z",
        "__v": 0
      },
      {
        "_id": "58dea585c96f11232e2c9764",
        "name": "A1",
        "slotId": "S2",
        "facilityId": "A",
        "clientId": "Aspire",
        "regNo": null,
        "inTime": null,
        "status": "available",
        "createdAt": "2017-03-31T18:52:53.190Z",
        "__v": 0
      }
    ],
    "orders": [
      {
        "_id": "58deb49d7e2b1430f705ae2b",
        "vehicleNo": "TN14H1303",
        "slotId": "S1",
        "inTime": "2017-03-31T19:57:17.518Z",
        "status": "close",
        "__v": 0,
        "amount": 49.40475,
        "outTime": "2017-03-31T21:36:06.088Z"
      },
      {
        "_id": "58deb68929747b3286c55320",
        "vehicleNo": "TN14H0889",
        "slotId": "S1",
        "inTime": "2017-03-31T20:05:29.522Z",
        "status": "close",
        "__v": 0,
        "mobileNo": "9940182302",
        "amount": 47.644325,
        "outTime": "2017-03-31T21:40:46.841Z"
      },
      {
        "_id": "58deb86fc5466134d6235f2f",
        "vehicleNo": "M\n\n",
        "slotId": "S2",
        "inTime": "2017-03-31T20:13:35.787Z",
        "status": "close",
        "__v": 0,
        "amount": 0.32635,
        "outTime": "2017-03-31T20:14:14.948Z"
      }
    ]
  }
};*/

});