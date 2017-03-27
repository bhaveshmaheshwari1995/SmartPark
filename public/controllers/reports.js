'use strict';
angular.module('apm.reports', ['ngRoute','ng-fusioncharts'])
.controller('reportsController', function($scope, $http, $stateParams, $state) {
	console.log('reports called');
	$scope.myDataSource = {
    chart: {
        caption: "Harry's SuperMart",
        subCaption: "Top 5 stores in last month by revenue",
        theme: "fint",
        "palette": "1"
        // numberPrefix: "$",
    },
    data:[{
        label: "S1",
        value: "50"
    },
    {
        label: "S2",
        value: "30"
    },
    {
        label: "S3",
        value: "20"
    },
    {
        label: "S4",
        value: "40"
    }]
};
});