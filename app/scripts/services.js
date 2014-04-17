'use strict';

var skrollsServices = angular.module('skrollsServices', ['ngResource']);

skrollsServices.factory('Skroll', ['$resource', 
	function($resource){
		return $resource('data/skrolls/s:skrollID.json', {}, {
			query: {method:'GET', params:{skrollID:'skrolls'}, isArray:true}
		});
	}
]);

userServices.factory('User', ['$resource',
  function($resource){
    return $resource('data/users/u:userID.json', {}, {
      query: {method:'GET', params:{userID:'user'}, isArray:false}
    });
  }]);

