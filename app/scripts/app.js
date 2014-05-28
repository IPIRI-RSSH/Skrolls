'use strict';

angular.module('skrollsApp', ['ngRoute','skrollControllers','skrollsServices', 'skrollsDirectives'])

.config(['$routeProvider', 
    function($routeProvider) {
		$routeProvider.
			when('/browse', {
				templateUrl: 'views/skrolls-list.html',
				controller: 'SkrollListController'
			}).
			when('/s/:skrollID', {
				templateUrl: 'views/skroll.html',
				controller: 'SkrollController'
			}).
			 when('/myskrolls', {
				templateUrl: 'views/userSkrolls.html',
				controller: 'SkrollListController'
			}).
			otherwise({
				templateUrl: 'views/home.html',
				controller: 'HomeController'
			});
    }]);
