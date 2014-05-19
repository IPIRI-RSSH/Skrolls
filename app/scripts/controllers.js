'use strict';
angular.module('skrollControllers', ['ngAnimate','ngResource','ngRoute'])

.controller('HomeController', ['$scope', '$routeParams', 'UserFact', 'nameFact', '$firebase', function($scope, $routeParams, UserFact, nameFact, $firebase) {
	var nameget=nameFact.getName($routeParams.userID);
	// push new skroll to base
	$scope.setSkroll = function() {
		$scope.skrollsRef = $firebase(new Firebase('https://skrollsapp.firebaseio.com/skrolls'));
		$scope.skrollsRef.$add({name: ""}).then(function(ref) {
			$scope.skrollURL = ref.name(); 
		});
	}
	$scope.update = function() {
		$scope.skrollsRefNew = $firebase(new Firebase('https://skrollsapp.firebaseio.com/skrolls/' + $scope.skrollURL));
		$scope.skrollsRefNew.$set({head: {name: $scope.skrollname, permissions: "writeable", postCount: 0, visibility: "public", skrollID: $scope.skrollURL}});
	}
	
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
.controller('SkrollListController', ['$scope', '$routeParams', '$firebase', 'SkrollFact', function($scope, $routeParams, $firebase, SkrollFact) {
	$scope.skrolls = $firebase(new Firebase('https://skrollsapp.firebaseio.com/skrolls'));
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
	$scope.url=document.URL;
	$scope.posts=$scope.skroll.$child('posts');
	console.log(nameFact.username);
	$scope.displayname=nameFact.username;
	$scope.post= function(){
		var count=$scope.skroll.head['postCount'];
		$scope.posts[count] = {text: $scope.message, author: $scope.displayname.username, timestamp: Firebase.ServerValue.TIMESTAMP};
		$scope.posts.$save(count);
		count++;
		$scope.skroll.$child('head').$update({postCount: count});
	}

}])
.controller('UserController', ['$scope', '$routeParams', '$firebase', 'UserFact', function($scope, $routeParams, $firebase, UserFact) {
		$scope.user=$firebase(new Firebase('https://skrollsapp.firebaseio.com/users/' + $routeParams.userID));

	}]);
