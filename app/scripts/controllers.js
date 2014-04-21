'use strict';
angular.module('skrollControllers', ['ngAnimate'])

.controller('HomeController', ['$scope', function($scope) {
	$scope.skrollname='';
	$scope.email='';
	$scope.pass='';
}])
.controller('SkrollListController', ['$scope', 'SkrollListFact', function($scope, SkrollListFact) {
	$scope.skrolls = SkrollListFact.query();
	$scope.sortBy = 'name';
}])
.controller('SkrollController', ['$scope', '$routeParams', 'SkrollFact', 'HeadFact', function($scope, $routeParams, SkrollFact, HeadFact) {
    HeadFact.get({headFile: 's' + $routeParams.skrollID + 'h.json'}, function(){}).$promise.then(
		function( value ){
			$scope.head = value; 
			if(value.permissions==="writeable"){
				$scope.posting=true;
			} else {
				$scope.posting=false;
			}
		},
		function( error ){SkrollFact.save({skrollFile: 's' +  $routeParams.skrollID + 'h.json'}, function(){})}
	)
    SkrollFact.get({skrollFile: 's' + $routeParams.skrollID + '.json'}, function(){}).$promise.then(
		function( value ){
			$scope.posts = value; 
		},
		function( error ){SkrollFact.save({skrollFile: 's' +  $routeParams.skrollID + '.json'}, function(){})}
	)
}])
.controller('UserController', ['$scope', '$routeParams', 'UserFact', 'HeadFact', function($scope, $routeParams, UserFact, HeadFact) {
	$scope.user = UserFact.get({userFile: 'u' + $routeParams.userID + '.json'}, function() {});
}]);