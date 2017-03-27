const exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var device_list = ""; 
var servicePath = __dirname + '/core/service.py';
var device_json_path = __dirname + '/core/devices.json';
var settings_json_path = __dirname + '/core/settings.json';
var fs = require('fs');
var paired_device = fs.readFileSync(device_json_path, 'utf8');
var settings_data = "";
var listener_process = "";

angular.module('SenseID.availableDevices').factory('bluetoothService', ['$http', '$rootScope','$timeout','$q', function ($http, $rootScope, $timeout, $q) {
    return {
        findDevices: function() {
            var defer = $q.defer();
            exec('python '+servicePath+' find_device', (error, stdout, stderr) => {
                if (error) return defer.reject(error);
                if (stdout!="") {
                    defer.resolve(JSON.parse(stdout));
                } else if (stderr!="") {
                    console.log("error on device "+stderr);
                } else {
                    console.log("No device found");
                }
            });
            return defer.promise;
        },
        connect: function (address) {
            var connect_to_device = "";
            var defer = $q.defer();
            connect_to_device = spawn('python',[servicePath,"connect_device",address]);
            connect_to_device.stdout.on('data', function(res) {
                var response = String.fromCharCode.apply(null, new Uint16Array(res));
                response = response.split("\n").join("").trim();
                defer.resolve(response);
            });
            connect_to_device.stderr.on('data', function(data) {
                defer.reject(data);
            });
            connect_to_device.on('close', function(code) {
                defer.reject(code);
            });
            return defer.promise;
        },
        listener: function() {
            var defer = $q.defer();
            if(listener_process == ""){
                listener_process = spawn('python',[servicePath, 'auth_user']);
            }
            listener_process.stdout.on('data',function(data) {
                var auth_reponse = JSON.parse(String.fromCharCode.apply(null, new Uint16Array(data)));
                defer.resolve(auth_reponse);
            });
            listener_process.stderr.on('data', function(data) {
            });
            listener_process.on('close', function(code) {
                defer.reject(code);
            });
            return defer.promise;
        },
        get_paired_device: function() {
            if(paired_device){
                return JSON.parse(paired_device);
            }
        },
        /*send_acknowledgement: function() {
            var defer = $q.defer();
            var send_acknowledgement_process = spawn('python',[servicePath, 'send_acknowledgement']);
            send_acknowledgement_process.stdout.on('data',function(data) {
                console.log("send_acknowledgement "+data);
                defer.resolve(data);
            });
            send_acknowledgement_process.stderr.on('data', function(data) {
                console.log("send_acknowledgement_process stderr "+data);
                defer.resolve(data);
            });
            send_acknowledgement_process.on('close', function(code) {
                console.log("send_acknowledgement close code "+code);
                defer.reject(code);
            });
            return defer.promise;
        },*/
        disconnect: function() {
            var defer = $q.defer();
            var dis_connect_process = spawn('python',[servicePath, 'dis_connect']);
            dis_connect_process.stdout.on('data',function(data) {
                defer.resolve(data);
            });
            dis_connect_process.stderr.on('data', function(data) {
            });
            dis_connect_process.on('close', function(code) {
            });
            return defer.promise;
        },
        get_setting_data: function() {
            var settings_data = fs.readFileSync(settings_json_path, 'utf8');
            if(settings_data){
                return JSON.parse(settings_data);
            }
        }
    }
}
]);