
var skrollsDirectives = angular.module('skrollsDirectives', []);

skrollsDirectives.directive('skrollButton', function() {
	return {
		template: '<a class="button-skroll" href="/#/s/{{skroll.skrollID}}">{{skroll.name}} <span class="right">{{skroll.mark}}</span>'
	};
});