'use strict';

angular.module('skrollsDirectives', [])

.directive('skrollButton', function() {
	return {
		restrict: 'A',
		template: '<a class="button-skroll" href="/#/s/{{skroll.head.skrollid}}">{{skroll.head.name}} <span class="right">{{skroll.head.postCount}}</span></a>'

	};
})
.directive('changeName', function() {
	return {
		restrict: 'A',
		template: '<span class="boldtext1">Display name: </span><input class="textfield-name" ng-model="displayname.username" type="text"></input>'
	};
})
.directive('enterSkroll', function() {
	return {
		restrict: 'A',
		template: '<h3> Enter Skroll name: </h3><form><input class="textfield" ng-model="skrollname" type="text" placeholder="new Skroll"/><br><a class="button" href="/#/s/{{skrollname}}">Open</a><br><br></form>'
	};
})

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
					element.parent().parent()[0].reset();
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
				load_image(element[0]);
			};
		},
		restrict: 'A'
	};
}])

.directive('imgDisp', ['$log', function ($log) {
	// Used to embed images stored in Firebase
	
	/*
	Required attributes:
		fp-src (The name of an image stored in Firebase)
	*/
	return {
		link: function (scope, elem, attrs) {
			
			var dataRef = new Firebase( ['https://skrollsapp.firebaseio.com', 'images'].join('/') );
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
}]);

