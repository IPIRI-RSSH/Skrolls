'use strict';

angular.module('skrollsServices', ['ngResource','firebase'])


	.factory('FireFact', ['$firebase', function($firebase){
		return $firebase(new Firebase('https://skrollsapp.firebaseio.com'));
	}])
	.factory('SkrollFact', ['$resource', function($resource){
		return $resource('https://skrollsapp.firebaseio.com/skrolls/:skrollid');
	}])
	.factory('UserFact', ['$resource', function($resource){
		var UserFact={
			errMsg: "", 
			incorrect: false, 
			user: '',
		};
		var fireRef= new Firebase('https://skrollsapp.firebaseio.com');
		var	auth =  new FirebaseSimpleLogin(fireRef, function(error, user) {
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
			      	console.log(error);
			    }
			   UserFact.incorrect=true;
			   console.log(error);
			   
		  	} else if (user) {
		  		UserFact.incorrect=false;
		  		if(typeof UserFact.switchloggedin !== 'undefined') UserFact.switchloggedin();
		  		UserFact.user=user;
		    	console.log('LOGGED IN = User ID: ' + user.uid + ', Provider: ' + user.provider);
		  	} else {
		  	}
		  	if(typeof UserFact.switchloggedin !== 'undefined') UserFact.refresh();
			});		
		
		UserFact.log = function(email, pass) {
			auth.login('password', {
				email: email,
				password: pass
			})
		};
		UserFact.reg = function(email, pass) {
			auth.createUser(email, pass, function(error, user) {
	  		if (!error) {
	    		UserFact.makeName(user.id);
	    		UserFact.log(email, pass);
	    		doLogin(user);
	  			}
	  			else console.log(error);
			});
		};
		function doLogin(user){
			UserFact.refresh();
		}
		UserFact.logout = function(){
	   		auth.logout();
	   		UserFact.switchloggedin();
	   	}
		UserFact.googlelog = function(){
			auth.login('google');
		}
		UserFact.gitlog = function(){
			auth.login('github');
		}
		UserFact.getUser = function(){
			auth
		}
		return UserFact;
	}])
	.factory('nameFact', ['$firebase', function($firebase){
		var nameFact={
			username: ''
		};
		nameFact.getName = function(usr){
			var fireRef= new Firebase('https://skrollsapp.firebaseio.com/users/'+usr);
			var nameobj=$firebase(fireRef);
			nameFact.username=nameobj;
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
	