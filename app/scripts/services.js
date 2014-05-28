'use strict';

angular.module('skrollsServices', ['ngResource','firebase'])


	.factory('FireFact', ['$firebase', function($firebase){
		return $firebase(new Firebase('https://skrollsapp.firebaseio.com'));
	}])
	.factory('SkrollFact', ['$resource', function($resource){
		return $resource('https://skrollsapp.firebaseio.com/skrolls/:skrollid');
	}])
	.factory('UserFact', ['$rootScope', '$resource', function($rootScope, $resource){
		var UserFact={
			errMsg: "", 
			incorrect: false, 
			user: ''
		};
		var fireRef= new Firebase('https://skrollsapp.firebaseio.com');
		var auth =  new FirebaseSimpleLogin(fireRef, function(error, user) {
			if (error) {
	    		switch(error.code) {
			    	case 'INVALID_EMAIL':
			    		UserFact.errMsg="Not a valid email address!";
			    		break;
			      	case 'INVALID_PASSWORD':
			      		UserFact.errMsg="Wrong password!";
			      		break;
			      	case 'INVALID_USER':
			      		UserFact.errMsg="User doesn't exist!";
			      		break;
			      	case 'EMAIL_TAKEN':
			      		UserFact.errMsg="Email taken!";
			      		break;
			      	default:
			      		UserFact.errMsg="Unknown error";
			   	}
			   UserFact.incorrect=true;
			   console.log(error);
			   UserFact.refreshErr();
			   
		  	} else if (user) {
		  		UserFact.incorrect=false;
		  		if(typeof UserFact.switchloggedin !== 'undefined') UserFact.switchloggedin();
		  		UserFact.user=user;
		  		$rootScope.user=user;
		    	UserFact.refresh();
		  	} else{
		  		$rootScope.user=null;
		  		if(typeof UserFact.switchloggedin !== 'undefined'){
		  			UserFact.switchloggedin();
		  			UserFact.refresh();
		  		}
		  	}
			});		

		UserFact.log = function(email, pass) {
			auth.login('password', {
				email: email,
				password: pass
			})
		};
		UserFact.reg = function(email, pass) {
			auth.createUser(email, pass, function(error, user) {
	  		if(error) {
	    		switch(error.code) {
			    	case 'INVALID_EMAIL':
			    		UserFact.errMsg="Not a valid email address!";
			    		break;
			      	case 'INVALID_PASSWORD':
			      		UserFact.errMsg="Wrong password!";
			      		break;
			      	case 'INVALID_USER':
			      		UserFact.errMsg="User doesn't exist!";
			      		break;
			      	case 'EMAIL_TAKEN':
			      		UserFact.errMsg="Email taken!";
			      		break;
			      	default:
			      		UserFact.errMsg="Unknown error";
			   	}
			   UserFact.incorrect=true;
			   console.log(error);
			   UserFact.refreshErr();
			
		  	} else {
	    		UserFact.makeName(user.id);
	  		}
			});
		};
		UserFact.logout = function(){
	   		auth.logout();
	   	}
		UserFact.googlelog = function(){
			auth.login('google');
		}
		UserFact.gitlog = function(){
			auth.login('github');
		}
		UserFact.getUser = function(){
			return UserFact.user;
		}
		return UserFact;
	}])
	.factory('nameFact', ['$firebase', function($firebase){
		var nameFact={
			name: ''
		};
		nameFact.getName = function(usr){
			var fireRef= new Firebase('https://skrollsapp.firebaseio.com/users/'+usr);
			var nameobj=$firebase(fireRef);
			nameFact.name=nameobj;
			return nameFact.name;
		}
		nameFact.setName = function(usr, newname){
			var fireRef= new Firebase('https://skrollsapp.firebaseio.com/users/'+usr);
			var nameobj=$firebase(fireRef);
			nameobj.$set({"name": newname});
			nameobj.$save;
		}
		return nameFact;
		}])
	.factory('redirector', ['$location', '$route', function($location, $route, target){
		var redirector={};
		redirector.go = function(target){
			$location.path(target);
			$route.reload();
		}
		return redirector;
	}])
