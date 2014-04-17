'use strict';

var skrollControllers = angular.module('skrollControllers', []);

skrollControllers.controller('SkrollListController', ['$scope', 'Skroll', function($scope, Skroll) {
  $scope.skrolls = Skroll.query();
  $scope.sortBy = 'name';
}]);

skrollControllers.controller('SkrollController', ['$scope', '$routeParams', 'Skroll', 
function($scope, $routeParams, Skroll) {
    $scope.posts = Skroll.get({skrollID: 's' + $routeParams.skrollID + '.json'}, function(){});
}]);

skrollControllers.controller('UserController', ['$scope', '$routeParams', '$http',
    function ($scope, $routeParams, $http) {
        $http.get('data/users/u' + $routeParams.userID + '.json').success(function(data) {
            $scope.user = data;
        });
    }]);