'use strict';
angular.module('skrollControllers', ['ngAnimate','ngResource','ngRoute'])

.controller('HomeController', ['$scope', '$routeParams', 'redirector', 'UserFact', 'nameFact', '$firebase', function($scope, $routeParams, redirector, UserFact, nameFact, $firebase) {
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
				if(UserFact.user == null) { 
					$scope.skrollsRef.$child($scope.skrollURL).$set({head: {name: $scope.skrollname, permissions: "writeable", postCount: 0, visibility: "public", skrollID: $scope.skrollURL}});
				}
				else {
					$scope.skrollsRef.$child($scope.skrollURL).$set({head: {name: $scope.skrollname, owner: UserFact.user.id, permissions: "writeable", postCount: 0, visibility: "public", skrollID: $scope.skrollURL}});
				}
				window.location = "/#/s/" + $scope.skrollURL;
			});
		}
		else {
			if(skrollVis === "public") window.location = "/#/s/" + skrollID;
			else alert("Skroll is private.");
		}
	}
}])
.controller('SkrollListController', ['$scope', '$routeParams',  'UserFact', '$firebase', 'redirector', 'SkrollFact', function($scope, $routeParams, UserFact, $firebase, redirector, SkrollFact) {
    $scope.skrolls = $firebase(new Firebase('https://skrollsapp.firebaseio.com/skrolls'));
	$scope.sortBy = 'name';
	$scope.uid = UserFact.user.id;
}])
.controller('SkrollController', ['$scope', '$routeParams', '$firebase', 'redirector', 'nameFact', 'UserFact', function($scope, $routeParams, $firebase, redirector, nameFact, UserFact) {
    $scope.skroll=$firebase(new Firebase('https://skrollsapp.firebaseio.com/skrolls/' + $routeParams.skrollID));
   	
   	$scope.skroll.$on('loaded', function(){
		$scope.displayname=nameFact.getName(UserFact.user.id);
		$scope.posting=true;
   	});
	$scope.message='';
	$scope.url=document.URL;
	$scope.posts=$scope.skroll.$child('posts');	

	$scope.post= function(){
		var count=$scope.skroll.head['postCount'];
		$scope.posts[count] = {text: $scope.message, image: $scope.imglink, author: $scope.displayname['name'], timestamp: Firebase.ServerValue.TIMESTAMP};
		$scope.posts.$save(count);
		nameFact.setName(UserFact.user.id, $scope.displayname['name']);
		$scope.displayname=nameFact.getName(UserFact.user.id);
		count++;
		$scope.skroll.$child('head').$update({postCount: count});
		document.getElementById("uploadform").reset();
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
			$scope.imagesRef =$firebase(new Firebase('https://skrollsapp.firebaseio.com'+ '/images'));
			$scope.imagesRef.$add({"data": image.data, "name": image.filename}).then(function(ref){
				$scope.imglink=ref.name();
				$scope.post();
				image.isUploading = false;
				image.data = undefined;
				image.filename = undefined;
				image=null;
			})
		}
		else{
			$scope.post();
		}
	}

}]);
