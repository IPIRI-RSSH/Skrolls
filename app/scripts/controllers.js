'use strict'

var skrollControllers = angular.module('skrollControllers', []);

<<<<<<< HEAD
skrollControllers.controller('SkrollListController', ['$scope', '$http',
    function ($scope, $http) {
        $http.get('data/skrolls/skrolls.json').success(function(data) {
            $scope.skrolls = data;
        });
        $scope.sortBy = 'name';
    }]);
skrollControllers.controller('SkrollController', ['$scope', '$routeParams', '$http',
    function ($scope, $routeParams, $http) {
        $http.get('data/skrolls/s' + $routeParams.skrollID + '.json').success(function(data) {
			$scope.posts = data;
		});
    }]);
skrollControllers.controller('UserController', ['$scope', '$routeParams', '$http',
	function ($scope, $routeParams, $http) {
		$http.get('data/users/u' + $routeParams.userID + '.json').success(function(data) {
			$scope.user = data;
		});
	}]);
=======
skrollControllers.controller('SkrollListController', ['$scope', 'Skroll', function($scope, Skroll) {
  $scope.skrolls = Skroll.query();
  $scope.sortBy = 'name';
}]);
skrollControllers.controller('SkrollController', ['$scope', '$routeParams', 'Skroll', function($scope, $routeParams, Skroll) {
        $scope.posts = Skroll.get({skrollID: 's' + $routeParams.skrollID}, function(){});
    }]);
>>>>>>> as11712-master
