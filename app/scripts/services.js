'use strict';

var skrollsServices = angular.module('skrollsServices', ['ngResource']);

skrollsServices.factory('Skroll', ['$resource', 
	function($resource){
		return $resource('data/skrolls/:skrollID.json', {}, {
			query: {method:'GET', params:{skrollID:'skrolls'}, isArray:true}
		});
	}]);