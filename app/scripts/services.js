'use strict';

var skrollsServices = angular.module('skrollsServices', ['ngResource']);

skrollsServices.factory('Skroll', ['$resource', 
	function($resource){
		return $resource('data/skrolls/:skrollID.json', {}, {
			query: {method:'GET', params:{skrollID:'skrolls'}, isArray:true}
		});
	}]);

skrollsServices.factory('User', ['$resource',
  function($resource){
    return $resource('data/users/:userID.json', {}, {
      query: {method:'GET', params:{userID:'user'}, isArray:false}
    });
  }]);