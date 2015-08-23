define(function (require) {

 	'use strict';

	/**
	*	Loading `Foo` specific modules 
	*/

	var Util = require('./Foo.Util');
	var Functions = require('./Foo.Functions');
    var Events = require('./Foo.Events');
    var Arrays = require('./Foo.Arrays');
    var Objects = require('./Foo.Objects');

    var Foo = function(selectorString, parentEl) {
    	parentEl = parentEl || document;
    	return parentEl.querySelectorAll(selectorString);
    };

debugger;
    // extend
    Objects.extendOwn(Foo, Objects);

    console.log(Foo);
    Objects.extendOwn(Foo, Arrays);
    Objects.extendOwn(Foo, Util);
    Objects.extendOwn(Foo, Functions);

    // stick to `Foo`
    Foo.Events = Events;

    // stick to `window`
    window.Foo = Foo;

	/**
	*	`lib` modules can be loaded like 
	*	 var jQuery = require('jQuery');
	*/

});