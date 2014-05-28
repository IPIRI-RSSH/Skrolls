'use strict';

angular.module('skrollsDirectives', [])

.directive('skrollButton', function() {
	return {
		restrict: 'A',
		template: '<a class="button-skroll" href="/#/s/{{skroll.head.skrollID}}">{{skroll.head.name}} <span class="right">{{skroll.head.postCount}}</span></a>'
	};
})
.directive('changeName', function() {
	return {
		restrict: 'A',
		template: '<span class="boldtext1">Post as: </span><input class="textfield-name" ng-model="displayname" type="text" maxlength="15"></input>'
	};
})
.directive('enterSkroll', function() {
	return {
		restrict: 'A',

		template: '<h3> Enter Skroll name: </h3><form><span class="incorrect" ng-show="showErr">{{err}}</span><input class="textfield" ng-model="skrollname" type="text" placeholder="new Skroll"/><br><button class="button" ng-click="setSkroll()">Open!</button><br><br></form>'
	};
})

.directive('imgDisp', ['$log', function ($log) {
	// Used to embed images stored in Firebase
	/*
	Required attributes:
		fp-src (The name of an image stored in Firebase)
	*/
	return {
		link: function (scope, elem, attrs) {
			var dataRef = new Firebase('https://skrollsapp.firebaseio.com/images/'+attrs.fpSrc);
			elem.attr('alt', attrs.fpSrc);
			dataRef.once('value', function (snapshot) {
				var image = snapshot.val();
				if (!image) {
				}else{
					elem.attr('src', image.data);
				}
			});
		},
		restrict: 'A'
	};
}])

.directive('signinbuttonDirective', ['$rootScope','$location', 'UserFact', '$firebase', function($rootScope, $location, UserFact, $firebase) {
	return {
		controller: function($scope, $element, $attrs, UserFact){
			$scope.loggedin=$rootScope.user;
			$scope.loggedout=!$scope.loggedin;
			$scope.loginform=false;
			$scope.UserFact=UserFact;
			$scope.skrollname='';
			$scope.user=$rootScope.user;
			$scope.email;
			$scope.pass;

			UserFact.refresh = function() {
				if (!$scope.$$phase) {
					$scope.$apply(function() {
						$scope.user=$rootScope.user;
						if ($rootScope.user != null ){
							if(typeof $rootScope.user.email === 'undefined'){
								$scope.email=$scope.user.username;
							} else $scope.email=$scope.user.email;
						}
					});
				}
			};
			UserFact.refreshErr = function(){
				if (!$scope.$$phase) $scope.$apply();
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
			};
			UserFact.makeName = function(id){
				var userref=$firebase(new Firebase('https://skrollsapp.firebaseio.com/users/'+id));
				userref.$set({name: "New user"});
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
		   		$location.path('');
		   	}
			function validate(){
				if($scope.email!= null && $scope.pass != null && $scope.pass.length >= 6){
					return true;
				}
				else{
					$scope.UserFact.errMsg="Input email and password!";
		 			$scope.UserFact.incorrect=true;
				}
			}
			$scope.switchLogin = function(){
				if($scope.loginform == false){
					$scope.loginform=true;
					document.getElementById("loginname").focus();
				}
				else $scope.loginform=false;
			}
			$scope.gomyskrolls = function(){
				$location.path('myskrolls');
			}
		},
		restrict: 'A',
		templateUrl:'/views/userstatus.html'
	};
}])

.directive('dockdir', ['$location', '$route', 'UserFact', function($location, $route, UserFact) {
	return {
		controller: function($scope, $element, $attrs){
			$scope.go = function(target){
				$location.path(target);
			};
		},
		restrict: 'A',
		templateUrl:'/views/dock.html'
	};
}])

.directive('imageUpload', [function() {
	return {
		link: function(scope, element, attrs) {
			// Modified from https://developer.mozilla.org/en-US/docs/Web/API/FileReader
			var fileReader = new FileReader();
			var fileFilter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;
			var wasUploading = false;
			scope.image = {valid: false};
 
			scope.$watch('image.isUploading', function () {
				var isUploading = scope.image.isUploading;
				if (isUploading && !wasUploading) {
					wasUploading = true;
				}else if (!isUploading && wasUploading) {
					wasUploading = false;
				}
			});
 
			fileReader.onload = function (fileReaderEvent) {
				scope.$apply(function () {
					scope.image.data = fileReaderEvent.target.result;
				});
			};
 
			var load_image = function(imageInput) {
				if (imageInput.files.length === 0) {
					return;
				}
				var file = imageInput.files[0];
				scope.image.filename = file.name;
				if (!fileFilter.test(file.type)) {
					console.log('You must select a valid image!');
					scope.image.valid = false;
					scope.$apply();
					return; 
				}else{
					scope.image.valid = true;
				}
				fileReader.readAsDataURL(file);
				scope.$apply();
			};
 
			element[0].onchange = function() {
				scope.image.done=false;
				load_image(element[0]);

			};
		},
		restrict: 'A'
	};
}]);
