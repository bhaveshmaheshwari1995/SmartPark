'use strict';
angular.module('apm.dashboard', ['ngRoute','ngMaterial','ng-fusioncharts'])
.controller('dashboardController', function($scope,$rootScope, $http,$timeout, $mdDialog) {
	console.log('dashboard called');
    var data=[];
    $scope.myDataSource={}
    var callback = function(){
        $scope.data.forEach(function(entry) {
            facilities.push(entry.facilityId);    
        });
        facilities = _.uniq(facilities);
        console.log(facilities);

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

        console.log("facility Info "+JSON.stringify(facilitiesInfo)); // [{"facility":"A","slots":["A1","A2","A1","A2"],"count":0},{"facility":"B","slots":["B1","B2","B1","B2"],"count":2}]
        
        facilitiesInfo.forEach(function(facility) {
            graphData.push({label:facility.facility,value:facility.count});    
        });
        graphData = _.uniq(graphData)
        console.log(graphData)

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
                console.log(response.data.slots);
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
    

   /* $scope.data = 
        [{slot:"A1",facility:"A",status:'available',in_time:'7-mar-2016',vehicle_no:'TN 14 H 1203'},
        {slot:"A2",facility:"A",status:'full',in_time:'1-mar-2016',vehicle_no:'TN 14 H 4503'},
        {slot:"B1",facility:"A",status:'available',in_time:'7-mar-2016',vehicle_no:'TN 14 H 1503'},
        {slot:"B2",facility:"B",status:'full',in_time:'7-mar-2016',vehicle_no:'TN 14 H 1333'},
        {slot:"C1",facility:"C",status:'full',in_time:'12-mar-2016',vehicle_no:'TN 14 H 1123'},
        {slot:"C2",facility:"C",status:'available',in_time:'7-mar-2016',vehicle_no:'TN 14 H 1344'},
        {slot:"A1",facility:"C",status:'full',in_time:'1-mar-2016',vehicle_no:'TN 14 H 1777'},
        {slot:"A2",facility:"A",status:'available',in_time:'7-mar-2016',vehicle_no:'TN 14 H 1311'},
        {slot:"B1",facility:"B",status:'full',in_time:'3-mar-2016',vehicle_no:'TN 14 H 0976'},
        {slot:"B2",facility:"B",status:'available',in_time:'7-mar-2016',vehicle_no:'TN 14 H 5503'},
        {slot:"B1",facility:"B",status:'full',in_time:'3-mar-2016',vehicle_no:'TN 14 H 0976'},
        {slot:"B2",facility:"B",status:'available',in_time:'7-mar-2016',vehicle_no:'TN 14 H 5503'}];*/

    var facilities = [];
    var facilitiesInfo = {};
    var graphData = [];

    
});