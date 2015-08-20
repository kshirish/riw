define(function () {

	'use strict';
	
    return {
    	// Array, Object, Arguments, Function, String, Undefined
    	// Null, Date, Boolean, RegExp, Number
        isThis: function (type, value) {
        	return Object.prototype.toString.call(value).indexOf(type) !== -1;
        },                                         
        isFinite: function (value) {
        	return value.toString() !== 'Infinity';
        },
        isNaN: function(value) {
        	return value !== value;
        },
        extend: function(dest, src) {
        	
        	if( this.isThis('Object', dest) && this.isThis('Object', src) ) {
        		for(var i in src) {
        			if(Object.hasOwnProperty(i)) {
        				dest.i = src.i;
        			}
        		}
        	}
        }
    };
});