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
   	$scope.skroll.$on('loaded', function(){
		if($scope.skroll.head['permissions']==="writeable"){
			$scope.posting=true;
		} else {
			$scope.posting=false;
		}
   	});
   	$scope.imglink='';
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

	$scope.upload_image = function (image) {
		if (!image.valid) return;

		var imagesRef, safename, imageUpload;
		
		image.isUploading = true;
		imageUpload = {
			isUploading: true,
			data: image.data,
			name: image.filename
		};
		imagesRef = new Firebase('https://skrollsapp.firebaseio.com'+ '/images');

		imagesRef.add(imageUpload).then(function(ref){
			imagesRef.child(ref.name).child('isUploading').remove();
			$scope.imglink=ref.name;
			post();
		});
	
				/*$scope.$apply(function () {
					console.log("uploaded");
					if ($scope.uploaded_callback !== undefined) {
						$scope.uploaded_callback(angular.copy(imageUpload));
					}
					image.isUploading = false;
					image.data = undefined;
					image.filename = undefined;
				});*/
		
		
	};
	

}])
.controller('UserController', ['$scope', '$routeParams', '$firebase', 'UserFact', function($scope, $routeParams, $firebase, UserFact) {
		$scope.user=$firebase(new Firebase('https://skrollsapp.firebaseio.com/users/' + $routeParams.userID));

	}]);
