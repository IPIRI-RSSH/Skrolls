'use strict'

var skrollControllers = angular.module('skrollControllers', []);

skrollControllers.controller('SkrollListController', ['$scope', '$http',
    function ($scope, $http) {
        $http.get('skrolls/skrolls.json').success(function(data) {
            $scope.skrolls = data;
        });
        $scope.sortBy = 'name';
    }]);
skrollControllers.controller('SkrollController', ['$scope', '$routeParams',
    function ($scope, $routeParams) {
        $scope.skrollID = $routeParams.skrollID;
    }]);