'use strict';
angular.module('skrollControllers', ['ngAnimate','ngResource','ngRoute'])

.controller('HomeController', ['$scope', '$routeParams', 'UserFact', 'nameFact', '$firebase', function($scope, $routeParams, UserFact, nameFact, $firebase) {
	var nameget=nameFact.getName($routeParams.userID);
	var scope = $scope;
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
	$scope.loggedout=true;
	$scope.loggedin=false;
	$scope.loginform=false;

	$scope.displayname=nameget;
	$scope.UserFact=UserFact;
	$scope.skrollname='';
	$scope.user=$scope.UserFact.user;
	$scope.email=$scope.UserFact.username;
	$scope.pass=$scope.UserFact.pass;

	UserFact.refresh = function() {
		if (!scope.$$phase) scope.$apply();
	};
	UserFact.switchloggedin = function(){
		if($scope.loggedout == true){
			$scope.loggedout=false;
			$scope.loggedin=true;
			$scope.loginform=false;
		}
		else{
			$scope.loggedout=true;
			$scope.loggedin=false;
			$scope.loginform=true;
		}
	}
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
	$scope.switchLogin = function(){
		if(scope.loginform == false){
			$scope.loginform=true;
			document.getElementById("loginname").focus();
		}
		else $scope.loginform=false;
	}
	
}])
.controller('SkrollListController', ['$scope', '$routeParams', '$firebase', 'SkrollFact', function($scope, $routeParams, $firebase, SkrollFact) {
    $scope.skrolls=$firebase(new Firebase('https://skrollsapp.firebaseio.com/skrolls'));
	$scope.sortBy = 'name';
}])
.controller('SkrollController', ['$scope', '$routeParams', '$firebase', 'nameFact', function($scope, $routeParams, $firebase, nameFact) {
    $scope.skroll=$firebase(new Firebase('https://skrollsapp.firebaseio.com/skrolls/' + $routeParams.skrollID));
   	$scope.imagesRef =$firebase(new Firebase('https://skrollsapp.firebaseio.com'+ '/images'));

   	$scope.skroll.$on('loaded', function(){
		$scope.posting=true;
   	});
	$scope.message='';
	$scope.url=document.URL;
	$scope.posts=$scope.skroll.$child('posts');
	$scope.displayname=nameFact.username;
	$scope.post= function(){
		var count=$scope.skroll.head['postCount'];
		$scope.posts[count] = {text: $scope.message, image: $scope.imglink, author: $scope.displayname.username, timestamp: Firebase.ServerValue.TIMESTAMP};
		$scope.posts.$save(count);
		count++;
		$scope.skroll.$child('head').$update({postCount: count});
	}

	$scope.upload_image = function (image) {
		if(image != null && image.valid){
			var imagesRef, safename, imageUpload;
			image.isUploading = true;
			imageUpload = {
				isUploading: true,
				data: image.data,
				name: image.filename
			};
			$scope.imagesRef.$add({"data": image.data, "name": image.filename}).then(function(ref){
				$scope.imglink=ref.name();
				$scope.post();
				image=null;
			})
		}
		else{
			$scope.post();
		}
	}

}])
.controller('UserController', ['$scope', '$routeParams', '$firebase', 'UserFact', function($scope, $routeParams, $firebase, UserFact) {
		$scope.user=$firebase(new Firebase('https://skrollsapp.firebaseio.com/users/' + $routeParams.userID));

	}]);


