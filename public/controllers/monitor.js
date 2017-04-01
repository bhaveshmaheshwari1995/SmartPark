'use strict';
angular.module('apm.monitor', ['ngRoute'])
.controller('monitorController', function($scope, $rootScope, $http, $stateParams,$timeout, $state) {
    console.log('monitor called ');
    
    $scope.facility = $stateParams.facility;
    $scope.data ={}

    var callback=function() {


        $scope.slowParkingDetails = function(slotName){
            $scope.slotDetails = slotName;
            console.log($scope.slotDetails)
        };  

        var parkingSlots = [];
        
        if($scope.facility == "")
        {
            console.log($rootScope.client.defaultFacility)
            $scope.facility = $rootScope.client.defaultFacility;
        }
        console.log($scope.data)
        $scope.data.forEach(function(entry) {
            console.log($scope.facility +" "+entry.facilityId+" "+$rootScope.client.clientId+' '+entry.clientId)
            if($scope.facility == entry.facilityId && $rootScope.client.clientId == entry.clientId)
                parkingSlots.push(entry);    
        });
        console.log(parkingSlots)
        $scope.parkingSlots = parkingSlots;

        var socket = io.connect('http://54.190.10.153:4200');
        socket.on('connect', function(data) {
           console.log("websocket 1 called");
           socket.emit('ldrData', 'ameyashukla');
       });

        socket.on('admin/parkingUpdate', function(currSlotInfo) {
            
            console.log(JSON.stringify($scope.data));
            console.log(currSlotInfo.name+" "+$scope.data.name);
            parkingSlots.forEach(function(parkingSlot) {
                console.log(currSlotInfo.facilityId+" "+parkingSlot.facilityId);
                console.log(currSlotInfo.clientId+" "+parkingSlot.clientId);

                if((currSlotInfo.name ==   parkingSlot.name )) {
                console.log(currSlotInfo.name);

                if(currSlotInfo.status == 'available'){
                    document.getElementById(currSlotInfo.name).className = "btn btn-default custom-btn facility available";
                }else if(currSlotInfo.status == 'full'){
                    document.getElementById(currSlotInfo.name).className = "btn btn-default custom-btn facility full";
                }

            }
            });

           
       });

        /*{ regNo: "W, b l lus  ", inTime: "2017-04-01T00:57:06.486Z", _id: "58de977e2b8945050d70e117", name: "B2", slotId: "sense06",
        facilityId: "B", clientId: "Aspire", status: "full", __v: 0 }*/

    }

    var getData = function(client){

        console.log('getData called')
        $http.get('http://54.190.10.153:4200/api/slots/'+client)
        .then(function(response){
            if(response.data.success){
                console.log(response.data.slots);
                $scope.data = response.data.slots;
                callback();
            }
        },function(response){
            console.log(response.data);
        });
    }
    
    $timeout(function() {
        getData($rootScope.client.clientId);
    }, 1500);


    getData($rootScope.client.clientId);
    /*$scope.data = 
               [{slot:"A1",facility:"A",status:'available',in_time:'7-mar-2016',vehicle_no:'TN 14 H 1203',client:'Aspire'},
                {slot:"A2",facility:"A",status:'full',in_time:'1-mar-2016',vehicle_no:'TN 14 H 4503',client:'Aspire'},
                {slot:"B1",facility:"B",status:'full',in_time:'7-mar-2016',vehicle_no:'TN 14 H 1503',client:'Aspire'},
                {slot:"B2",facility:"B",status:'available',in_time:'7-mar-2016',vehicle_no:'TN 14 H 1333',client:'Aspire'},
                {slot:"C1",facility:"C",status:'available',in_time:'12-mar-2016',vehicle_no:'TN 14 H 1123',client:'Aspire'},
                {slot:"C2",facility:"C",status:'full',in_time:'7-mar-2016',vehicle_no:'TN 14 H 1344',client:'Aspire'},
                {slot:"A1",facility:"A",status:'available',in_time:'1-mar-2016',vehicle_no:'TN 14 H 1777',client:'Infosys'},
                {slot:"A2",facility:"A",status:'available',in_time:'7-mar-2016',vehicle_no:'TN 14 H 1311',client:'Infosys'},
                {slot:"B1",facility:"B",status:'full',in_time:'3-mar-2016',vehicle_no:'TN 14 H 0976',client:'Infosys'},
                {slot:"B2",facility:"B",status:'available',in_time:'7-mar-2016',vehicle_no:'TN 14 H 5503',client:'Infosys'}
   ];
   */



});

