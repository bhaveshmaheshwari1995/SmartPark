'use strict';
angular.module('apm.dashboard', ['ngRoute','ngMaterial','ng-fusioncharts'])
.controller('dashboardController', function($scope,$rootScope, $http,$timeout, $mdDialog) {
	console.log('dashboard called');
    var data=[];
    var facilities = [];
    var facilitiesInfo = {};
    var graphData = [];
    $scope.myDataSource={}
    var callback = function(){
        $scope.data.forEach(function(entry) {
            facilities.push(entry.facilityId);    
        });
        facilities = _.uniq(facilities);

        facilitiesInfo = []
        facilities.forEach(function(facility) {
            var tempArray = [];
            var tempObj = {};
            var occupiedCount = 0;
            $scope.data.forEach(function(slotDetails) {
                if(slotDetails.facilityId == facility){
                    tempArray.push(slotDetails.name)
                    if(slotDetails.status=='full'){
                        occupiedCount++;
                    }
                }
            })
            tempObj = {'facility':facility,'slots':tempArray,'count':occupiedCount}
            facilitiesInfo.push(tempObj)
        });
        $scope.facilitiesInfo = facilitiesInfo;

        facilitiesInfo.forEach(function(facility) {
            graphData.push({label:facility.facility,value:facility.count});    
        });
        graphData = _.uniq(graphData)


        $scope.myDataSource = {
            chart: {
                caption: "SmartPark Current occupied Parking Stats",
                "palette": "2",
                numberSuffix: " cars"
            },
            data:graphData
        };

    }
    var getData = function(client){
        console.log('getData called')
        $http.get('http://54.190.10.153:4200/api/slots/'+client)
        .then(function(response){
            if(response.data.success){
                $scope.data =  response.data.slots;
                callback();
            }
        },function(response){
            console.log(response.data);
        });
    }
    
    $timeout(function() {
        getData($rootScope.client.clientId);
    }, 1500);

   

    
});