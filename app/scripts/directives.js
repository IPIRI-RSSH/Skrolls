'use strict';

angular.module('skrollsDirectives', [])

.directive('skrollButton', function() {
	return {
		restrict: 'A',
		template: '<a class="button-skroll" href="/#/s/{{skroll.skrollID}}">{{skroll.name}} <span class="right">{{skroll.mark}}</span>'
	};
});