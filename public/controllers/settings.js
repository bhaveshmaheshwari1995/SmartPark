'use strict';
angular.module('apm.settings', ['ngRoute','ng-fusioncharts'])
.controller('settingsController', function($scope, $rootScope, $http, $stateParams, $state) {
	console.log('settings called');
    $scope.showFacilityUI = false;
    $scope.showClientUI = false;
    $scope.addFacility = function(){
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
            dataToSend  = {client:$rootScope.client, facility:$scope.newFacilityName};
            console.log('dataToSend '+JSON.stringify(dataToSend));
        }
    }

    $scope.facilityList = ['A','B','C','D'];

    $scope.selectedFacilityName = 'Select Facility';
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
            var sendSlotDetails = {client:$rootScope.client, slot:slotFields}
            console.log(sendSlotDetails)
        }
        slotFields=[]
    }


});