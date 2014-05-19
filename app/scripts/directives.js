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
		template: '<span class="boldtext1">Display name: </span><input class="textfield-name" ng-model="displayname.username" type="text"></input>'
	};
})
.directive('enterSkroll', function() {
	return {
		restrict: 'A',
		template: '<h3> Enter Skroll name: </h3><form><input class="textfield" ng-model="skrollname" type="text" placeholder="new Skroll"/><br><a class="button" ng-mousedown="setSkroll()" ng-mouseup="update()"  ng-href="/#/s/{{skrollURL}}">Open</a><br><br></form>'
	};
});

