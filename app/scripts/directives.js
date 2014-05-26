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
		template: '<span class="boldtext1">Post as: </span><input class="textfield-name" ng-model="displayname.username" type="text" maxlength="15"></input>'
	};
})
.directive('enterSkroll', function() {
	return {
		restrict: 'A',

		template: '<h3> Enter Skroll name: </h3><form><input class="textfield" ng-model="skrollname" type="text" placeholder="new Skroll"/><br><p class="button" ng-click="setSkroll()"  >Open</p><br><br></form>'
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

.directive('signinbuttonDirective', function() {
	return {

		restrict: 'A',
		templateUrl:'/views/userstatus.html'
	};
})
