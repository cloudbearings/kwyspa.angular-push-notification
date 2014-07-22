/**
*/

'use strict';

angular.module('myApp').controller('HomeCtrl', ['$scope', 'pushNotification', function($scope, pushNotification) {
	$scope.requestPermission = function() {
		pushNotification.prompt();
	};
	$scope.sendNotification = function() {
		pushNotification.push('test', 'this is text', 'myIcon', 'myTag');
	};
	$scope.notificationsEnabled = function() {
		return pushNotification.isEnabled();
	};
	$scope.disable = function() {
		pushNotification.disable();
	};
}]);