'use strict';
angular.module('apm.settings', ['ngRoute','ng-fusioncharts'])
.controller('settingsController', function($scope, $http, $stateParams, $state) {
	console.log('settings called');
    $scope.showFacility = false;
    $scope.addFacility = function(){
        $scope.showFacility = true;    
    }

    $scope.facilityList = ['A','B','C','D'];
    $scope.selectedFacilityName = 'Select Facility';
    $scope.selectedFacility = function(facility){
        console.log(facility);
        $scope.selectedFacilityName = facility;
    }

    var slotFields = [];
    $scope.addSlotFields = function(){
        console.log($scope.slotData)
        slotFields.push($scope.slotData);
        $scope.slotData = {}
    }
    $scope.addSlots = function(){
        var sendSlotDetails = {"facility":$scope.selectedFacilityName,"slot":slotFields}
        console.log(sendSlotDetails)
        slotFields=[]
    }

        

});