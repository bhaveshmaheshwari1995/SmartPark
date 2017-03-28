'use strict';
angular.module('apm.monitor', ['ngRoute'])
.controller('monitorController', function($scope, $http, $stateParams, $state) {
	console.log('monitor called');

    $scope.data = [{slot:"A1",block:"A",facility:"Aspire",status:'full'},
                {slot:"A2",block:"A",facility:"Aspire",status:'available'},
                {slot:"B1",block:"B",facility:"Aspire",status:'full'},
                {slot:"B2",block:"B",facility:"Aspire",status:'full'},
                {slot:"C1",block:"C",facility:"Aspire",status:'available'},
                {slot:"C2",block:"C",facility:"Aspire",status:'full'},
                {slot:"A1",block:"A",facility:"Info",status:'available'},
                {slot:"A2",block:"A",facility:"Info",status:'full'},
                {slot:"B1",block:"B",facility:"Info",status:'full'},
                {slot:"B2",block:"B",facility:"Info",status:'available'}
    ];

  $http.get('http://192.168.0.107:4200/parkingInfo')
  .then(function(response){
  	if(response.data.success){
  		console.log(response.data.data);
  		$scope.data = response.data.data;
  	}
  },function(response){
  	console.log(response.data);
  })

var socket = io.connect('http://192.168.0.107:4200');
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
});