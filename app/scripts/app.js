'use strict'

var skrollsApp = angular.module('skrollsApp', [
    'ngRoute',
    'skrollControllers'
]);


skrollsApp.config(['$routeProvider', 
    function ($routeProvider) {
        $routeProvider.
            when('/skrolls', {
                templateUrl: 'views/skrolls-list.html',
                controller: 'SkrollListController'
            }).
            when('/skrolls/s:skrollIDh.json', {
                templateUrl: 'views/skroll.html',
                controller: 'SkrollController'
            }).
            otherwise({
                redirectTo: '/skrolls'
            });
    }]);