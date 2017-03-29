'use strict';
angular.module('apm.dashboard', ['ngRoute','ngMaterial'])
.controller('dashboardController', function($scope, $mdDialog) {
	console.log('dashboard called');

	$scope.data = [{slot:"A1",block:"A",facility:"Aspire",status:0,in_time:'7-mar-2016',vehicle_no:'TN 14 H 1203'},
                {slot:"A2",block:"A",facility:"Aspire",status:0,in_time:'1-mar-2016',vehicle_no:'TN 14 H 4503'},
                {slot:"B1",block:"B",facility:"Aspire",status:1,in_time:'7-mar-2016',vehicle_no:'TN 14 H 1503'},
                {slot:"B2",block:"B",facility:"Aspire",status:0,in_time:'7-mar-2016',vehicle_no:'TN 14 H 1333'},
                {slot:"C1",block:"C",facility:"Aspire",status:0,in_time:'12-mar-2016',vehicle_no:'TN 14 H 1123'},
                {slot:"C2",block:"C",facility:"Aspire",status:1,in_time:'7-mar-2016',vehicle_no:'TN 14 H 1344'},
                {slot:"A1",block:"A",facility:"Info",status:0,in_time:'1-mar-2016',vehicle_no:'TN 14 H 1777'},
                {slot:"A2",block:"A",facility:"Info",status:0,in_time:'7-mar-2016',vehicle_no:'TN 14 H 1311'},
                {slot:"B1",block:"B",facility:"Info",status:1,in_time:'3-mar-2016',vehicle_no:'TN 14 H 0976'},
                {slot:"B2",block:"B",facility:"Info",status:0,in_time:'7-mar-2016',vehicle_no:'TN 14 H 5503'}
               ];
    console.log(JSON.stringify($scope.data));
});