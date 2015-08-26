define(function () {

	'use strict';
	
    return {
    	first: function(arr, n) {
    		return Array.prototype.slice.call(arr, 0, n);
    	},
    	initial: function(arr, n) {
    		return Array.prototype.slice.call(arr, 0, -n);	
    	},
    	last: function(arr, n) {
    		var length = arr.length;	
    		return Array.prototype.slice.call(arr, length - n, length);
    	},
        rest: function(arr, n) {
            return Array.prototype.slice.call(arr, n+1);
        },
        compact: function(arr) {
            return Array.prototype.filter.call(arr, function(value) { return value; });
        },
        without: function(arr) {

            var args = Array.prototype.slice.call(Arguments, 1);

            return Array.prototype.filter.call(arr, function(value) { 
                return Array.prototype.every.call(args, function(arg) {
                    return value !== arg;
                })
            });
        },
        uniq: function(arr) {

            var output = [];

            arr = Array.prototype.sort.call(arr, function(a, b) {return a-b;});

            Array.prototype.forEach.call(arr, function(value, index) {
                if(value !== arr[ !index || index-1 ]) {
                    output.push(value);
                }
            });

            return output;
        },
        object: function(list, values) {
            
            var output = {};

            if(values) {

                Array.prototype.forEach.call(list, function(value, index) {
                    output[value] = values[index];
                });
            } else {

                Array.prototype.forEach.call(list, function(value, index) {
                    output[value[0]] = value[1];
                });
            }

            return output;
        },
        indexOf: function(arr, value) {
            return Array.prototype.indexOf.call(arr, value);
        },
        lastIndexOf: function(arr, value) {
            return Array.prototype.lastIndexOf.call(arr, value);
        },
        findIndex: function(arr, predicate, context) {  // returns the first index

            var index;

            Array.prototype.some.call(arr, function(value, i) {

                if( predicate.bind(context, value) ) {
                    index = i;
                    return true;
                }
            });

            return typeof index === 'undefined' ? -1 : index;
        },
        findLastIndex: function(arr, predicate, context) {  // returns the last index

            var index;

            Array.prototype.forEach.call(arr, function(value, i) {
                if( predicate.bind(context, value) ) { index = i; }
            });

            return typeof index === 'undefined' ? -1 : index;
        }

    };
});
