
var skrollControllers = angular.module('skrollControllers', ['ngAnimate']);

skrollControllers.controller('HomeController', ['$scope', function($scope) {
	$scope.skrollname='';
	$scope.email='';
	$scope.pass='';
}]);
skrollControllers.controller('SkrollListController', ['$scope', 'SkrollListFact', function($scope, SkrollListFact) {
	$scope.skrolls = SkrollListFact.query();
	$scope.sortBy = 'name';
}]);
skrollControllers.controller('SkrollController', ['$scope', '$routeParams', 'SkrollFact', function($scope, $routeParams, SkrollFact) {
    SkrollFact.get({skrollFile: 's' + $routeParams.skrollID + '.json'}, function(){}).$promise.then(
		function( value ){$scope.posts = value},
		function( error ){SkrollFact.save({skrollFile: 's' +  $routeParams.skrollID + '.json'}, function(){})}
	)
}]);
skrollControllers.controller('UserController', ['$scope', '$routeParams', 'UserFact', function($scope, $routeParams, UserFact) {
	$scope.user = UserFact.get({userFile: 'u' + $routeParams.userID + '.json'}, function() {});
}]);