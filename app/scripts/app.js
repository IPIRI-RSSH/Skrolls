'use strict'

var skrollsApp = angular.module('skrollsApp', [
    'ngRoute',
    'skrollControllers'
]);


skrollsApp.config(['$routeProvider', 
    function ($routeProvider) {
        $routeProvider.
            when('/data/skrolls', {
                templateUrl: 'views/skrolls-list.html',
                controller: 'SkrollListController'
            }).
            when('/data/skrolls/:skrollID', {
                templateUrl: 'views/skroll.html',
                controller: 'SkrollController'
            }).
            otherwise({
                templateUrl: 'views/home.html'
            });
    }]);