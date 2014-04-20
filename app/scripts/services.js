'use strict';

var skrollsServices = angular.module('skrollsServices', ['ngResource']);

skrollsServices.factory('SkrollFact', ['$resource', 
	function($resource){
		return $resource('data/skrolls/:skrollID.json', {}, {
			query: {method:'GET', params:{skrollID:'skrolls'}, isArray:true}
		});
	}]);

skrollsServices.factory('UserFact', ['$resource',
  	function($resource){
	    return $resource('data/users/:userID.json', {}, {
	      	query: {method:'GET', params:{userID:'user'}, isArray:false}
	    });
  	}]);
