
var skrollControllers = angular.module('skrollControllers', ['ngAnimate']);

skrollControllers.controller('SkrollListController', ['$scope', 'SkrollListFact', function($scope, SkrollListFact) {
	$scope.skrolls = SkrollListFact.query();
	$scope.sortBy = 'name';
}]);
skrollControllers.controller('SkrollController', ['$scope', '$routeParams', 'SkrollFact', function($scope, $routeParams, SkrollFact) {
    SkrollFact.get({skrollID: 's' + $routeParams.skrollID}, function(){}).$promise.then(
		function( value ){$scope.posts = value},
		function( error ){SkrollFact.save({skrollID: 's' + $routeParams.skrollID}, function(){})}
	)
}]);
skrollControllers.controller('UserController', ['$scope', '$routeParams', 'UserFact', function($scope, $routeParams, UserFact) {
	$scope.user = UserFact.get({userID: 'u' + $routeParams.userID}, function() {});
}]);