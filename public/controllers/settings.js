'use strict';
angular.module('apm.settings', ['ngRoute','ng-fusioncharts'])
.controller('settingsController', function($scope,$timeout, $rootScope, $http,$state) {
	console.log('settings called');
    $scope.showFacilityUI = false;
    $scope.showClientUI = false;
    $scope.facilityList = {}
    
    var getFacilitylist = function(client){
        $http.get(config.hostname+'/api/facility/'+client)
        .then(function(response){
            if(response.data.success){
                $scope.facilityList = response.data.facilities;
                console.log(response.data)
            }
            return response.data.code
        },function(response){
            console.log(response.data);
            return 0
        });
    }

    $timeout(function() {
        getFacilitylist($rootScope.client.clientId);
    }, 1500);

    var addFacility = function(data){
        $http.post(config.hostname+'/api/facility',data)
        .then(function(response){
            console.log(response);
            if(response.data.success){
                $scope.success = true;
                $scope.error = false;
                $scope.errorInSlot = false;
                $scope.successMessage = "Facility added successfully";
            }
            else{
                $scope.error = true;
                $scope.successInSlot = false;
                $scope.success = false;
                $scope.errorMessage = "Unable to save data. Please check input.";
            }
            return response.data.code
        },function(response){
            console.log(response.data);
            $scope.error = true;
            $scope.successInSlot = false;
            $scope.success = false;
            $scope.errorMessage = "Unable to save data. Please check input.";
        });
    }

    var addClient = function(data){
        $http.post(config.hostname+'/api/clients',data)
        .then(function(response){
            console.log(response);
            if(response.data.success){
                console.log("Client Added Successfully");
                $scope.success = true;
                $scope.error = false;
                $scope.errorInSlot = false;
                $scope.successMessage = "Client Added Successfully";
                $rootScope.clientList.push(data);
            }
            else{
                $scope.error = true;
                $scope.successInSlot = false;
                $scope.success = false;
                $scope.errorMessage = "Unable to save data. Please check input.";
                console.log('Error');
            }
        },function(response){
            console.log(response.data);
            $scope.error = true;
            $scope.successInSlot = false;
            $scope.success = false;
            $scope.errorMessage = "Unable to save data. Please check input.";

        });
    }
    var addSlots = function(data){
        $http.post(config.hostname+'/api/slots',data)
        .then(function(response){
            if(response.data.success) {
                console.log("slots added successfully");
                $scope.successInSlot = true;
                $scope.error = false;
                $scope.errorInSlot = false;
                $scope.successMessage = "Slots saved successfully";
            }
            else {
                console.log('error');
                $scope.errorInSlot = true;
                $scope.success = false;
                $scope.successInSlot = false;
                $scope.errorMessage = "Unable to save data. Please check input.";
            }
        },function(response){
            console.log(response.data);
            $scope.errorInSlot = true;
            $scope.success = false;
            $scope.successInSlot = false;
            $scope.errorMessage = "Error Please check input again";
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
        if($scope.newFacilityName == undefined || $scope.newFacilityName == ""){
            $scope.error = true;
            $scope.successInSlot = false;
            $scope.errorMessage = "Error Please check input again";
            console.log('Error');
        }
        else{
            $scope.error = false;
            $scope.errorInSlot = false;
            var dataToSend = {}
            dataToSend  = {client:$rootScope.client.clientId, name:$scope.newFacilityName};
            $scope.newFacilityName = "";
            $scope.newFacilityCapacity = "";
            addFacility(dataToSend);
        }
    }
    $scope.submitClient = function(){
        if($scope.newClientName == undefined || $scope.newClientName == "" || $scope.newDefaultFacility == undefined || $scope.newDefaultFacility == ""){
            $scope.error = true;
            $scope.successInSlot = false;
            $scope.success = false;
            $scope.errorMessage = "Error Please check input again";
        }
        else{
            var dataToSend = {}
            $scope.error = false;
            $scope.errorInSlot = false;
            dataToSend  = {clientId:$scope.newClientName, defaultFacility:$scope.newDefaultFacility};
            addClient(dataToSend)
            $scope.newClientName = "";
            $scope.newDefaultFacility = "";
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
        }
        slotFields=[]
    }
    $scope.hideError = function(){
        $scope.error = false;
        $scope.errorInSlot = false;
        $scope.success = false;
        $scope.successInSlot = false;
    }
    
    $("#addSlot").on("hidden.bs.modal", function () {
        slotFields = [];
    });    

});