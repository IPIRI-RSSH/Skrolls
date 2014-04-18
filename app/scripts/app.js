'use strict'

var skrollsApp = angular.module('skrollsApp', [
    'ngRoute',
    'skrollControllers',
	'skrollsServices'
]);

skrollsApp.config(['$routeProvider', 
    function ($routeProvider) {
		$routeProvider.
			when('/skrolls', {
				templateUrl: 'views/skrolls-list.html',
				controller: 'SkrollListController'
			}).
			when('/skrolls/:skrollID', {
				templateUrl: 'views/skroll.html',
				controller: 'SkrollController'
			}).
			 when('/users/:userID', {
				templateUrl: 'views/user.html',
				controller: 'UserController'
			}).
			otherwise({
				templateUrl: 'views/home.html'
			});
    }]);