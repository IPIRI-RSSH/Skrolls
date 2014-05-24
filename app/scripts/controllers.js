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
.controller('SkrollListController', ['$scope', '$routeParams', '$firebase', 'SkrollFact', function($scope, $routeParams, $firebase, SkrollFact) {
	$scope.skrolls = $firebase(new Firebase('https://skrollsapp.firebaseio.com/skrolls'));
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
			})}
		
	}

}])
.controller('UserController', ['$scope', '$routeParams', '$firebase', 'UserFact', function($scope, $routeParams, $firebase, UserFact) {
		$scope.user=$firebase(new Firebase('https://skrollsapp.firebaseio.com/users/' + $routeParams.userID));

	}]);
