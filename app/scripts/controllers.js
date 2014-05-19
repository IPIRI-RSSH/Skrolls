'use strict';
angular.module('skrollControllers', ['ngAnimate','ngResource','ngRoute',])

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
.controller('SkrollListController', ['$scope', '$routeParams', '$firebase', 'SkrollFact', function($scope, $routeParams, $firebase, SkrollFact) {
	$scope.skrolls = $firebase(new Firebase('https://skrollsapp.firebaseio.com/skrolls'));
	$scope.sortBy = 'name';
}])
.controller('SkrollController', ['$scope', '$routeParams', '$firebase', 'SkrollFact', function($scope, $routeParams, $firebase, SkrollFact) {
    $scope.skroll=$firebase(new Firebase('https://skrollsapp.firebaseio.com/skrolls/' + $routeParams.skrollID));
   	$scope.skroll.$on('loaded', function(){
		if($scope.skroll.head['permissions']==="writeable"){
			$scope.posting=true;
		} else {
			$scope.posting=false;
		}
   	});
	$scope.message='';
	$scope.posts=$scope.skroll.$child('posts');
		$scope.displayname='';
		$scope.post= function(){
			var count=$scope.skroll.head['postCount'];
			$scope.posts[count] = {text: $scope.message, author: $scope.displayname, timestamp: Firebase.ServerValue.TIMESTAMP};
			$scope.posts.$save(count);
			count++;
			$scope.skroll.$child('head').$update({postCount: count});
		}

}])
.controller('UserController', ['$scope', '$routeParams', 'UserFact', 'HeadFact', function($scope, $routeParams, UserFact, HeadFact) {
	$scope.user = UserFact.get({userFile: 'u' + $routeParams.userID + '.json'}, function() {});
}]);
