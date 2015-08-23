define(function () {

	'use strict';
	
	var arr = [];

    return {

    	pushme: function(n) {arr.push(n);},
    	on: function(event, callback, context) {

    	},
    	off: function(event, callback, context) {

    	}, 
    	trigger: function(event) {

    	},
    	once: function(event, callback, context) {

    	},
    	listen: function(otherObject, event, callback) {
    		
    	},
    	stopListening: function(otherObject, event, callback) {

    	},
    	listenToOnce: function(otherObject, event, callback) {

    	}
    };
});