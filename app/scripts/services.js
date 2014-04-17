'use strict';

var skrollsServices = angular.module('skrollsServices', ['ngResource']);

skrollsServices.factory('Skroll', ['$resource', 
	function($resource){
		return $resource('data/skrolls/s:skrollIDh.json', {}, {
			query: {method:'GET', params:{skrollID:'phones'}, isArray:true}
		});
	}
]);