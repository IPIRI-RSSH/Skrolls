
var skrollsServices = angular.module('skrollsServices', ['ngResource']);

skrollsServices.factory('SkrollFact', ['$resource', function($resource){
		return $resource('data/skrolls/:skrollID.json');
	}]);
skrollsServices.factory('SkrollListFact', ['$resource', function($resource){
		return $resource('data/skrolls/skrolls.json');
	}]);
skrollsServices.factory('UserFact', ['$resource', function($resource){
	    return $resource('data/users/:userID.json');
  	}]);