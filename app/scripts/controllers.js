'use strict'

var skrollControllers = angular.module('skrollControllers', []);

skrollControllers.controller('SkrollListController', ['$scope', 'SkrollFact', function($scope, SkrollFact) {
	$scope.skrolls = SkrollFact.query();
	$scope.sortBy = 'name';
}]);
skrollControllers.controller('SkrollController', ['$scope', '$routeParams', 'SkrollFact', function($scope, $routeParams, SkrollFact) {
    $scope.posts = SkrollFact.get({skrollID: 's' + $routeParams.skrollID}, function(){});
}]);
skrollControllers.controller('UserController', ['$scope', '$routeParams', 'UserFact', function ($scope, $routeParams, UserFact) {
	$scope.user = UserFact.get({userID: 'u' + $routeParams.userID}, function() {});
}]);