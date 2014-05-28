'use strict';
angular.module('skrollControllers', ['ngAnimate','ngResource','ngRoute'])

.controller('HomeController', ['$scope', '$routeParams', 'redirector', 'UserFact', 'nameFact', '$firebase', function($scope, $routeParams, redirector, UserFact, nameFact, $firebase) {
	$scope.showErr=false;
	$scope.err='';
	// check if name already exists
	$scope.setSkroll = function() {
	    if($scope.skrollname != "") {
			$scope.dataRef = new Firebase('https://skrollsapp.firebaseio.com/skrolls');
			$scope.dataRef.once('value', function(dataSnapshot) {
				var nameExist = false;
				var skrollID;
				var skrollVis;
				var ownerID
				dataSnapshot.forEach(function(skrolls) {
					var skroll = skrolls.child('head').val();
					if (skroll['name'] === $scope.skrollname) {
						nameExist = true;
						skrollID = skroll['skrollID'];
						skrollVis = skroll['visibility'];
						ownerID = skroll['owner'];
					}
				});
				update(nameExist, skrollID, skrollVis, ownerID);
			});
		}
	}
	// create new skroll and push to base
	var update = function(nameExist, skrollID, skrollVis, ownerID) {
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
			if(skrollVis === "public" || ownerID === UserFact.user.id){
				$scope.showErr=false;
				 window.location = "/#/s/" + skrollID;
			} else{
				$scope.showErr=true;
				$scope.err="This Skroll is private!";
				$scope.$apply();
			}

		}
	}
}])
.controller('SkrollListController', ['$scope', '$routeParams',  'UserFact', '$firebase', 'redirector', 'SkrollFact', function($scope, $routeParams, UserFact, $firebase, redirector, SkrollFact) {
    $scope.skrolls = $firebase(new Firebase('https://skrollsapp.firebaseio.com/skrolls'));
	$scope.sortBy = 'head.name';
	$scope.sortType = "true";
	$scope.uid = UserFact.user.id;
}])
.controller('SkrollController', ['$scope', '$routeParams', '$firebase', '$rootScope', 'redirector', 'nameFact', 'UserFact', function($scope, $routeParams, $firebase, $rootScope, redirector, nameFact, UserFact) {
   	var fireref=new Firebase('https://skrollsapp.firebaseio.com/skrolls/' + $routeParams.skrollID);
   	
   	$scope.owner=false;
    $scope.skroll=$firebase(fireref);
   	$scope.skroll.$on('loaded', function(){
		$scope.displayname=nameFact.getName(UserFact.user.id);
		
		console.log($scope.displayname.name);
   	});
   	fireref.once('value', function(snap){
   		if(snap.val().head.owner == UserFact.user.id){
   			$scope.owner=true;
   		}
   	});
	$scope.message='';
	$scope.url=document.URL;
	$scope.posts=$scope.skroll.$child('posts');	
	$scope.islocked= false;
	$scope.isopen=!$scope.islocked;
	$scope.ispublic=true;
	$scope.isprivate=!$scope.ispublic;
	$scope.posting=$scope.owner || $scope.isopen;
	fireref.on('value', function(snapshot) {
	  	$scope.islocked = snapshot.val().head.permissions == "protected";
	  	$scope.ispublic = snapshot.val().head.visibility == "public";
	  	$scope.isopen = !$scope.islocked;
		$scope.isprivate = !$scope.ispublic;
	});
	$scope.switchpermissions = function(){
		if(!$scope.owner) return;
		if($scope.islocked){
			$scope.skroll.$child('head').$update({permissions: "writeable"});
		}
		else{
			$scope.skroll.$child('head').$update({permissions: "protected"});
		}
	}
	$scope.switchvisibility = function(){
		if(!$scope.owner) return;
		if($scope.isprivate){
			$scope.skroll.$child('head').$update({visibility: "public"});
		}
		else{
			$scope.skroll.$child('head').$update({visibility: "private"});
		}
	}
	$scope.post= function(){
		var count=$scope.skroll.head['postCount'];
		$scope.posts.$add({text: $scope.message, image: $scope.imglink, author: $scope.displayname['name'], timestamp: Firebase.ServerValue.TIMESTAMP});
		if(UserFact.user.id != null){
			nameFact.setName(UserFact.user.id, $scope.displayname['name']);
			$scope.displayname=nameFact.getName(UserFact.user.id);
		}
		count++;
		$scope.skroll.$child('head').$update({postCount: count});
		document.getElementById("uploadform").reset();
		$scope.imglink=null;
	}
	$scope.upload_image = function (image) {
		if(image != null && image.valid && !image.done){
			var imagesRef, imageUpload;
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
				image.done=true;
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
