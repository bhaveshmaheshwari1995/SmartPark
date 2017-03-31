'use strict';
angular.module('apm.settings', ['ngRoute','ng-fusioncharts'])
.controller('settingsController', function($scope, $rootScope, $http, $stateParams, $state) {
	console.log('settings called');
    $scope.showFacilityUI = false;
    $scope.showClientUI = false;
    
    var getFacilitylist = function(client){
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

    var addClient = function(){
        $http.post('http://54.190.10.153:4200/parkingInfo/')
        .then(function(response){
            if(response.data.success){
                console.log(response.data.data);
                $scope.data = response.data.data;
            }
        },function(response){
            console.log(response.data);
        });
    }

    var addSlot = function(data){
        $http.post('http://54.190.10.153:4200/parkingInfo/'+data)
        .then(function(response){
            if(response.data.success){
                console.log(response.data.data);
                $scope.data = response.data.data;
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
        if($scope.newFacilityName == undefined || $scope.newFacilityName == ""){
            console.log('Error');
        }
        else{
            var dataToSend = {}
            dataToSend  = {client:$rootScope.client.client, facility:$scope.newFacilityName};
            console.log('dataToSend '+JSON.stringify(dataToSend));
            $scope.newFacilityName = "";
        }
    }
    $scope.submitClient = function(){
        if($scope.newClientName == undefined || $scope.newClientName == "" || $scope.newDefaultFacility == undefined || $scope.newDefaultFacility == ""){
            console.log('Error');
        }
        else{
            var dataToSend = {}
            dataToSend  = {client:$scope.newClientName, defaultFacility:$scope.newDefaultFacility};
            console.log('dataToSend '+JSON.stringify(dataToSend));
            $scope.newClientName = "";
            $scope.newDefaultFacility = "";
            addClient(dataToSend);
        }
    }

    $scope.facilityList = getFacilitylist($rootScope.client.client);
    $scope.facilityList = ['A','B','C','D'];

    $scope.selectedFacilityName = $rootScope.client.defaultFacility;
    $scope.selectedFacility = function(facility){
        $scope.selectedFacilityName = facility;
    }

    var slotFields = [];
    var slotData = {};
    $scope.addSlotFields = function(){

        if($scope.slotData == undefined || $scope.slotData.name == undefined || $scope.slotData.sensorId == undefined || $scope.slotData.name == "" || $scope.slotData.sensorId == ""){
            console.log('Error');
        }
        else{
            slotData = $scope.slotData;
            slotData.facility = $scope.selectedFacilityName;
            console.log(slotData)
            slotFields.forEach(function(entry) {
                
                console.log(entry)
            });

            slotFields.push(slotData);
        }
            $scope.slotData = {}
    }
    $scope.addSlots = function(){
        if(slotFields.length == 0){
            console.log('submit error');
        }
        else{
            var dataToSend = {client:$rootScope.client.client, slot:slotFields}
            console.log(dataToSend)
            addSlots(dataToSend)
        }
        slotFields=[]
    }

});