define(function () {

	'use strict';
	
    return {
		curry: function( ) {

            var slice = Array.prototype.slice;
            var self = this;
            var totalargs = self.length;

            var partial = function( args, fn ) {
                return function( ) {
                    return fn.apply( {}, args.concat( slice.call( arguments ) ) );
                }
            };

            /**
            *   Recursion ends when `fn` has EXACT number of arguments till then
            *   `fn` calls `partial` and then `partial` collects the arguments 
            *   and alternatively calls `fn`.
            */
            var fn = function( ) {
                var args = slice.call( arguments );
                return ( args.length < totalargs ) ? partial( args, fn ) : self.apply( {}, slice.apply( arguments, [ 0, totalargs ] ));
            };

            return fn;
        }
    };
});
