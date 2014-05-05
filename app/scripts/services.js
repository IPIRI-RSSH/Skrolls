'use strict';

angular.module('skrollsServices', ['ngResource'])

	.factory('SkrollFact', ['$resource', function($resource){
		return $resource('data/skrolls/:skrollFile');
	}])
	.factory('HeadFact', ['$resource', function($resource){
		return $resource('data/skrolls/:headFile');
	}])
	.factory('SkrollListFact', ['$resource', function($resource){
		return $resource('data/skrolls/skrolls.json');
	}])
	.factory('UserFact', ['$resource', function($resource){
	    return $resource('data/users/:userFile');
	}]);
	