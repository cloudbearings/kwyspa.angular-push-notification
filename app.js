/**
@toc
1. setup - whitelist, appPath, html5Mode
*/

'use strict';

angular.module('myApp', [
'ngRoute', 'ngSanitize', 'ngTouch',		//additional angular modules
'kwyspa.angular-push-notification'
]).
config(['$routeProvider', '$locationProvider', '$compileProvider', 'pushNotificationProvider', function($routeProvider, $locationProvider, $compileProvider, pushNotificationProvider) {
	/**
	setup - whitelist, appPath, html5Mode
	@toc 1.
	*/
	$locationProvider.html5Mode(false);		//can't use this with github pages / if don't have access to the server
	pushNotificationProvider.setIcons({
		'myIcon': 'icon.ico'
	});
	pushNotificationProvider.setCloseTime(3000);
	// var staticPath ='/';
	var staticPath;
	// staticPath ='/angular-services/angular-push-notification/';		//local
	// staticPath ='/';		//nodejs (local)
	staticPath ='/angular-push-notification/';		//gh-pages
	var appPathRoute ='/';
	var pagesPath =staticPath+'pages/';
	
	
	$routeProvider.when(appPathRoute+'home', {templateUrl: pagesPath+'home/home.html'});

	$routeProvider.otherwise({redirectTo: appPathRoute+'home'});
	
}]);