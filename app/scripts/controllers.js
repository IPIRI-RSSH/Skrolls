'use strict';
angular.module('skrollControllers', ['ngAnimate','ngResource','ngRoute'])

.controller('HomeController', ['$scope', '$routeParams', 'UserFact', 'nameFact', '$firebase', function($scope, $routeParams, UserFact, nameFact, $firebase) {
	var nameget=nameFact.getName($routeParams.userID);
	// check if name already exists
	$scope.setSkroll = function() {
	    if($scope.skrollname != "") {
			$scope.dataRef = new Firebase('https://skrollsapp.firebaseio.com/skrolls');
			$scope.dataRef.once('value', function(dataSnapshot) {
				var nameExist = false;
				var skrollID;
				var skrollVis;
				dataSnapshot.forEach(function(skrolls) {
					var skroll = skrolls.child('head').val();
					if (skroll['name'] === $scope.skrollname) {
						nameExist = true;
						skrollID = skroll['skrollID'];
						skrollVis = skroll['visibility'];
					}
				});
				update(nameExist, skrollID, skrollVis);
			});
		}
	}
	// create new skroll and push to base
	var update = function(nameExist, skrollID, skrollVis) {
		if(!nameExist) {
			$scope.skrollsRef = $firebase($scope.dataRef);
			$scope.skrollsRef.$add({name: ""}).then(function(ref) {
				$scope.skrollURL = ref.name();
				if(UserFact.user == "") { 
					$scope.skrollsRef.$child($scope.skrollURL).$set({head: {name: $scope.skrollname, permissions: "writeable", postCount: 0, visibility: "public", skrollID: $scope.skrollURL}});
				}
				else {
					$scope.skrollsRef.$child($scope.skrollURL).$set({head: {name: $scope.skrollname, owner: $routeParams.userID, permissions: "writeable", postCount: 0, visibility: "public", skrollID: $scope.skrollURL}});
				}
				window.location = "/#/s/" + $scope.skrollURL;
			});
		}
		else {
			if(skrollVis === "public") window.location = "/#/s/" + skrollID;
			else alert("Skroll is private.");
		}
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
    $scope.skrolls=$firebase(new Firebase('https://skrollsapp.firebaseio.com/skrolls'));
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
		$scope.posts[count] = {text: $scope.message, author: $scope.displayname.username, timestamp: Firebase.ServerValue.TIMESTAMP};
		$scope.posts.$save(count);
		count++;
		$scope.skroll.$child('head').$update({postCount: count});
	}
}]);