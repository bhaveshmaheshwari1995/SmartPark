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

    $scope.showAlert = function(slot) {
    $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title(slot.slot)
        .textContent("facility "+slot.facility+'status '+slot.status+'in_time '+slot.in_time+'<br>'+'vehicle_no '+slot.vehicle_no  
            )
        .ariaLabel('Alert Dialog Demo')
        .ok('Got it!')
    );
  };

// [Aspire:A:[A1,A2,A3],[B:[B1,B2,B3]]],[Info:[C:[C1,C2,C3]],[D:[D1,D2,D3]]]]
/*var finaldata1 = [Aspire:[A:[A1,A2,A3]],[B:[B1,B2,B3]],[Info:[C:[C1,C2,C3]],[D:[D1,D2,D3]]]];
*/

});