define(function() {

	'use strict';

	var idcounter = 0;	// used for uniqueId

	return {
		// Runs Foo.js in noConflict mode, returning the `Foo` variable
		// to its previous owner. Returns a reference of this `Foo`.
		noConflict: function() {
			root.Foo = existingFoo;
			return this;
		},
		random: function(min, max) {
			if (max == null) {
				max = min;
				min = 0;
			}
			return min + Math.floor(Math.random() * (max - min + 1));
		},
		times: function(n, iteratee, context) {

			var returnArray = [];

			for (var i = 1; i <= n; i++) {
				returnArray.push(iteratee(i));
			}

			return returnArray;
		},
		// useful as default iteratees i.e. f(x) === x
		identity: function(value) {
			return value;
		},
		constant: function(value) {
			return function() {
				return value;
			}
		},
		noop: function() {},
		uniqueId: function(prefix) {
			prefix = prefix || '';
			return ++idcounter + prefix;
		}
	};
});