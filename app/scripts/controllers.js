'use strict';
angular.module('skrollControllers', ['ngAnimate','ngResource','ngRoute'])

.controller('HomeController', ['$scope', 'UserFact', function($scope, UserFact) {
	$scope.skrollname='';
	$scope.email='';
	$scope.pass='';
	$scope.log = function() {
		UserFact.get({userFile:'u12.json'}).$promise.then(
		function( value ){
			$scope.user = value;
			
		},
		function( error ){})
		
	};
	$scope.reg = function() {
		UserFact.save({userFile:'u456.json'});
	};
}])
.controller('SkrollListController', ['$scope', 'SkrollListFact', function($scope, SkrollListFact) {
	$scope.skrolls = SkrollListFact.query();
	$scope.sortBy = 'name';
}])
.controller('SkrollController', ['$scope', '$routeParams', 'SkrollFact', 'HeadFact', function($scope, $routeParams, SkrollFact, HeadFact) {
    HeadFact.get({headFile: 's' + $routeParams.skrollID + 'h.json'}).$promise.then(
		function( value ){
			$scope.head = value; 
			if(value.permissions==="writeable"){
				$scope.posting=true;
			} else {
				$scope.posting=false;
			}
		},
		function( error ){SkrollFact.save({skrollFile: 's' +  $routeParams.skrollID + 'h.json'})}
	)
    SkrollFact.get({skrollFile: 's' + $routeParams.skrollID + '.json'}).$promise.then(
		function( value ){
			$scope.posts = value; 
		},
		function( error ){SkrollFact.save({skrollFile: 's' +  $routeParams.skrollID + '.json'})}
	)
}])
.controller('UserController', ['$scope', '$routeParams', 'UserFact', 'HeadFact', function($scope, $routeParams, UserFact, HeadFact) {
	$scope.user = UserFact.get({userFile: 'u' + $routeParams.userID + '.json'}, function() {});
}]);
