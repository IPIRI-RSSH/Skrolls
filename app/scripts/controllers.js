'use strict';
angular.module('skrollControllers', ['ngAnimate','ngResource','ngRoute'])

.controller('HomeController', ['$scope', '$routeParams', 'UserFact', 'nameFact', function($scope, $routeParams, UserFact, nameFact) {
	var nameget=nameFact.getName($routeParams.userID);

	$scope.displayname=nameget;

	$scope.UserFact=UserFact;
	$scope.skrollname='';
	$scope.user=UserFact.user;
	$scope.email=UserFact.username;
	$scope.pass=UserFact.pass;
	
	$scope.log = function() {
		if (validate()){
			UserFact.log($scope.email, $scope.pass);
		}
	};
	$scope.reg = function() {
		if (validate()){
			UserFact.reg($scope.email, $scope.pass);
		}
	};
	$scope.googlelog = function(){
		UserFact.googlelog();
	}
	$scope.gitlog = function(){
		UserFact.gitlog();
	}
	$scope.logout = function(){
   			UserFact.logout();
   			console.log("logging out...");
   			window.location = "/#/";
   	}
	function validate(){
		if($scope.email!= null && $scope.pass.length >= 6){
			return true;
		}
		else{
			$scope.UserFact.errMsg="Input email and password!";
 			$scope.UserFact.incorrect=true;
		}
	}
}])
.controller('SkrollListController', ['$scope', 'SkrollListFact', function($scope, SkrollListFact) {
	$scope.skrolls = SkrollListFact.query();
	$scope.sortBy = 'name';
}])
.controller('SkrollController', ['$scope', '$routeParams', '$firebase', 'nameFact', function($scope, $routeParams, $firebase, nameFact) {
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
	console.log(nameFact.username);
	$scope.displayname=nameFact.username;
	$scope.post= function(){
		var count=$scope.skroll.head['postCount'];
		$scope.posts[count] = {text: $scope.message, author: $scope.displayname, timestamp: Firebase.ServerValue.TIMESTAMP};
		$scope.posts.$save(count);
		count++;
		$scope.skroll.$child('head').$update({postCount: count});
	}

}])
.controller('UserController', ['$scope', '$routeParams', '$firebase', 'UserFact', function($scope, $routeParams, $firebase, UserFact) {
		$scope.user=$firebase(new Firebase('https://skrollsapp.firebaseio.com/users/' + $routeParams.userID));

	}]);
