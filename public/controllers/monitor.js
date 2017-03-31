'use strict';
angular.module('apm.monitor', ['ngRoute'])
.controller('monitorController', function($scope, $rootScope, $http, $stateParams, $state) {
	console.log('monitor called ');

    var getData = function(client){
        $http.get('http://54.190.10.153:4200/parkingInfo/'+client)
        .then(function(response){
            if(response.data.success){
                console.log(response.data.data);
                $scope.data = response.data.data;
            }
        },function(response){
            console.log(response.data);
        });
}

  $scope.facility = $stateParams.facility;

    $scope.data = 
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

   $scope.data = getData($rootScope.clent.client);

  $scope.slowParkingDatails = function(slotName){
    $scope.slotDetails = slotName;
  };

    var socket = io.connect('http://54.190.10.153:4200');
    socket.on('connect', function(data) {
     console.log("Asdf");
     socket.emit('ldrData', 'ameyashukla');
    });

    socket.on('server', function(data) {
     console.log('1'+ data);
    });
    
    socket.on('ameyashukla', function(data) {
     console.log(data.slot_no)
     if(data.status == 'available'){
      document.getElementById(data.slot_no).className = "btn btn-default custom-btn facility available";
    }
    else{
      document.getElementById(data.slot_no).className = "btn btn-default custom-btn facility full";
    }

  });

  var parkingSlots = [];
  if($scope.facility=="")
  {
    $scope.facility = 'A';
  }
  $scope.data.forEach(function(entry) {
        if($scope.facility == entry.facility && $rootScope.client.client == entry.client)
        parkingSlots.push(entry);    
    });
    parkingSlots = _.uniq(parkingSlots);
    $scope.parkingSlots = parkingSlots;
  });

