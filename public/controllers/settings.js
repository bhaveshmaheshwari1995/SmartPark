'use strict';
angular.module('apm.settings', ['ngRoute','ng-fusioncharts'])
.controller('settingsController', function($scope,$timeout, $rootScope, $http) {
	console.log('settings called');
    $scope.showFacilityUI = false;
    $scope.showClientUI = false;
    $scope.facilityList = {}

    
/*    $scope.facilityList = [
    {
      "_id": "58deabdcc42cc6296b554df1",
      "name": "A",
      "clientId": "Aspire",
      "capacity": 8,
      "createdAt": "2017-03-31T19:19:56.755Z",
      "__v": 0
    },
    {
      "_id": "58deabecc42cc6296b554df2",
      "name": "B",
      "clientId": "Aspire",
      "capacity": 8,
      "createdAt": "2017-03-31T19:20:12.523Z",
      "__v": 0
    }
  ];*/
    
    var getFacilitylist = function(client){
        console.log(client)
        $http.get('http://54.190.10.153:4200/api/facility/'+client)
        .then(function(response){
            if(response.data.success){
                $scope.facilityList = response.data.facilities;
                console.log(response.data)

            }
        },function(response){
            console.log(response.data);
        });
    }

    $timeout(function() {
        getFacilitylist($rootScope.client.clientId);
    }, 1500);

    

    var addFacility = function(data){
        $http.post('http://54.190.10.153:4200/api/facility',data)
        .then(function(response){
            console.log(response);
            if(response.data.success){
                console.log("Facility successfully added");
                return 1;
            }
            else{
                return 0;
            }
        },function(response){
            console.log(response.data);
            return 0;
        });
    }

    var addClient = function(data){
        $http.post('http://54.190.10.153:4200/api/clients',data)
        .then(function(response){
            if(response.data.success){
                console.log("Client Added Successfully");
            }
        },function(response){
            console.log(response.data);
        });
    }

    var addSlots = function(data){
        $http.post('http://54.190.10.153:4200/api/slots',data)
        .then(function(response){
            if(response.data.success){
                console.log("slots added successfully");
            }
        },function(response){
            console.log(response.data);
        });
    }

    $scope.showFacility = function(){
        $scope.showFacilityUI = true;
        $scope.showClientUI = false;    
    }
    $scope.showClient = function(){
        $scope.showClientUI = true;
        $scope.showFacilityUI = false;
    }
    $scope.submitFacility = function(){
        if($scope.newFacilityName == undefined || $scope.newFacilityName == "" || $scope.newFacilityCapacity == undefined || $scope.newFacilityCapacity == ""){
            $scope.error = true;
            $scope.successInSlot = false;
            $scope.errorMessage = "Error Please check input again";
            console.log('Error');
        }
        else{
            $scope.error = false;
            $scope.errorInSlot = false;
            var dataToSend = {}
            dataToSend  = {client:$rootScope.client.clientId, name:$scope.newFacilityName, capacity: $scope.newFacilityCapacity};
            $scope.newFacilityName = "";
            $scope.newFacilityCapacity = "";
            addFacility(dataToSend);
            $scope.success = true;
            $scope.successMessage = "Data Entered Successfully";
        }
    }
    $scope.submitClient = function(){
        if($scope.newClientName == undefined || $scope.newClientName == "" || $scope.newDefaultFacility == undefined || $scope.newDefaultFacility == ""){
            $scope.error = true;
            $scope.successInSlot = false;
            $scope.errorMessage = "Error Please check input again";
        }
        else{
            var dataToSend = {}
            $scope.error = false;
            $scope.errorInSlot = false;
            dataToSend  = {client:$scope.newClientName, defaultFacility:$scope.newDefaultFacility};
            $scope.newClientName = "";
            $scope.newDefaultFacility = "";
            addClient(dataToSend);
            $scope.success = true;
            $scope.successMessage = "Data Entered Successfully";
        }
    }

    
    $scope.loadDefaultFacility = function(){
        $scope.selectedFacilityName = $rootScope.client.defaultFacility;
    }
    $scope.selectedFacility = function(facility){
        $scope.selectedFacilityName = facility;
    }
    var slotFields = [];
    var slotData = {};
    $scope.addSlotFields = function(){

        if($scope.slotData == undefined || $scope.slotData.name == undefined || $scope.slotData.sensorId == undefined || $scope.slotData.name == "" || $scope.slotData.sensorId == ""){
            console.log('Error');
            $scope.errorInSlot = true;
            $scope.successInSlot = false;
            $scope.errorMessage = "Error Please check input again";
        }
        else{
            $scope.error = false;
            $scope.errorInSlot = false;
            slotData = $scope.slotData;
            slotData.facility = $scope.selectedFacilityName;
            slotFields.push(slotData);
        }
            $scope.slotData = {}
    }
    $scope.addSlots = function(){
        if(slotFields.length == 0){
            console.log('error');
            $scope.errorInSlot = true;
            $scope.successInSlot = false;
            $scope.errorMessage = "Error Please check input again";
        }
        else{
            $scope.error = false;
            $scope.errorInSlot = false;
            var dataToSend = {client:$rootScope.client.clientId, slot:slotFields}
            addSlots(dataToSend)
            $scope.successInSlot = true;
            $scope.successMessage = "Data Entered successfully";
        }
        slotFields=[]
    }
    $scope.hideError = function(){
        $scope.error = false;
        $scope.errorInSlot = false;
    }

});