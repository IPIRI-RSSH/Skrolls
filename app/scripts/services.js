'use strict';

angular.module('skrollsServices', ['ngResource','firebase'])


	.factory('FireFact', ['$firebase', function($firebase){
		return $firebase(new Firebase('https://skrollsapp.firebaseio.com'));
	}])
	.factory('SkrollFact', ['$resource', function($resource){
		return $resource('https://skrollsapp.firebaseio.com/skrolls/:skrollid');
	}])
	.factory('SkrollListFact', ['$resource', function($resource){
		return $resource('data/skrolls/skrolls.json');
	}])
	.factory('UserFact', ['$resource', function($resource){
		var UserFact={
			errMsg: "", 
			incorrect: false, 
			user: '',
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
			      	console.log(error);
			    }
			   UserFact.incorrect=true;
			   console.log(error);
		  	} else if (user) {
		  		UserFact.incorrect=false;
		  		doLogin(user);
		  		UserFact.user=user;
		    	console.log('LOGGED IN = User ID: ' + user.uid + ', Provider: ' + user.provider);
		  	} else {
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
	  		if (!error) {
	    		console.log('REGISTERED User Id: ' + user.uid + ', Email: ' + user.email);
	    		doLogin(user);
	  			}
			});
		};
		function doLogin(user){
			window.location = "/#/u/"+user.id;
		}
		UserFact.logout = function(){
	   		auth.logout();
	   	}
		UserFact.googlelog = function(){
			auth.login('google');
		}
		UserFact.gitlog = function(){
			auth.login('github');
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
			console.log(nameobj.username);
			console.log(nameFact.username);
			return nameFact.username;
		}
		
		return nameFact;
		}])
	