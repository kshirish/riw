define(function() {

    'use strict';

    return {
        // Array, Object, Arguments, Function, String, Undefined
        // Null, Date, Boolean, RegExp, Number
        isThis: function(type, value) {
            return Object.prototype.toString.call(value).indexOf(type) !== -1;
        },
        isFinite: function(value) {
            return value.toString() !== 'Infinity';
        },
        isNaN: function(value) {
            return value !== value;
        },
        extend: function(dest) {

            var sources;
            
            if(dest instanceof Object) {

                sources = Array.prototype.slice.call(arguments, 1);

                for (var i = 0; i < sources.length; i++) {

                    if (sources[i] instanceof Object) {
                        for (var key in sources[i]) {
                            dest[key] = sources[i][key];
                        }
                    }
                }
            }

        },
        extendOwn: function(dest) {

            var sources;

            if(dest instanceof Object) {

                sources = Array.prototype.slice.call(arguments, 1);

                for (var i = 0; i < sources.length; i++) {

                    if (sources[i] instanceof Object) {
                        for (var key in sources[i]) {
                            if (sources[i].hasOwnProperty(key)) {
                                dest[key] = sources[i][key];
                            }
                        }
                    }
                }
            }

        },
        keys: function(obj) {
            return Object.keys(obj);
        },
        allKeys: function(obj) {

            var keys = [];

            for (var key in obj) {
                keys.push(key);
            }

            return keys;
        },
        values: function() {

            var values = [];

            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    values.push(obj[key]);
                }
            }

            return values;
        },
        mapObject: function(obj, iteratee, context) {

            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    obj[key] = iteratee.call(context, obj[key], key);
                }
            }

            return obj;
        },
        create: function(prototype, props) {

            function F() {}
            F.prototype = prototype;
            return this.extend(new F(), props);
        },
        findKey: function(obj, predicate, context) {

            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    if (predicate.call(context, obj[key])) {
                        return key;
                    }
                }
            }
        },
        pick: function(obj, predicate) {

            var returnObj = {},
                props;

            if (this.isThis('Function', predicate)) {

                for (var key in obj) {

                    if (obj.hasOwnProperty(key) && predicate(obj[key], key, obj)) {
                        returnObj[key] = obj[key];
                    }
                }

            } else {

                props = Array.prototype.slice.call(arguments, 1);

                for (var i = 0; i < props.length; i++) {

                    if (obj.hasOwnProperty(props[i])) {
                        returnObj.props[i] = obj.props[i];
                    }
                }

            }

            return returnObj;
        },
        clone: function(objectToBeCloned) {
            /**
            *   Reference: https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/The_structured_clone_algorithm
            */
            
            // Primitives
            if (!(objectToBeCloned instanceof Object)) {
                return objectToBeCloned;
            }

            var objectClone;

            // Filter out special objects.
            var Constructor = objectToBeCloned.constructor;
            
            switch (Constructor) {
                // Implement other special objects here.
                case RegExp:
                    objectClone = new Constructor(objectToBeCloned);
                    break;
                case Date:
                    objectClone = new Constructor(objectToBeCloned.getTime());
                    break;
                default:
                    objectClone = new Constructor();
            }

            // Clone each property.
            for (var prop in objectToBeCloned) {
                objectClone[prop] = clone(objectToBeCloned[prop]);
            }

            return objectClone;
        },
        cloneWithoutFunction: function(objectToBeCloned) {
            // Faster than light
            return JSON.parse(JSON.stringify(objectToBeCloned))
        },
        has: function(obj, key) {
            return Object.prototype.hasOwnProperty.call(obj, key);
        },
        property: function(key) {
            return function(obj) {
                return obj[key];
            };
        },
        propertyOf: function(key) {
            return function(obj) {
                return obj[key];
            };
        },
        isEmpty: function(obj) {
            return Object.keys(obj).length > 0;
        },
        isElement: function(obj) {
            return !!(obj && obj.nodeType === 1);
        },
        isEqual: function() {

            var i, l, leftChain, rightChain;

            function compare2Objects (x, y) {

                var p;

                // remember that NaN === NaN returns false
                // and isNaN(undefined) returns true
                if (isNaN(x) && isNaN(y) && typeof x === 'number' && typeof y === 'number') {
                     return true;
                }

                // Compare primitives and functions.     
                // Check if both arguments link to the same object.
                // Especially useful on step when comparing prototypes
                if (x === y) {
                    return true;
                }

                // Works in case when functions are created in constructor.
                // Comparing dates is a common scenario. Another built-ins?
                // We can even handle functions passed across iframes
                if ((typeof x === 'function' && typeof y === 'function') ||
                   (x instanceof Date && y instanceof Date) ||
                   (x instanceof RegExp && y instanceof RegExp) ||
                   (x instanceof String && y instanceof String) ||
                   (x instanceof Number && y instanceof Number)) {
                    return x.toString() === y.toString();
                }

                // At last checking prototypes as good a we can
                if (!(x instanceof Object && y instanceof Object)) {
                    return false;
                }

                if (x.isPrototypeOf(y) || y.isPrototypeOf(x)) {
                    return false;
                }

                if (x.constructor !== y.constructor) {
                    return false;
                }

                if (x.prototype !== y.prototype) {
                    return false;
                }

                // Check for infinitive linking loops
                if (leftChain.indexOf(x) > -1 || rightChain.indexOf(y) > -1) {
                     return false;
                }

                // Quick checking of one object beeing a subset of another.
                // todo: cache the structure of arguments[0] for performance
                for (p in y) {
                    if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
                        return false;
                    }
                    else if (typeof y[p] !== typeof x[p]) {
                        return false;
                    }
                }

                for (p in x) {
                    if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
                        return false;
                    }
                    else if (typeof y[p] !== typeof x[p]) {
                        return false;
                    }

                    switch (typeof (x[p])) {
                        case 'object':
                        case 'function':

                            leftChain.push(x);
                            rightChain.push(y);

                            if (!compare2Objects (x[p], y[p])) {
                                return false;
                            }

                            leftChain.pop();
                            rightChain.pop();
                            break;

                        default:
                            if (x[p] !== y[p]) {
                                return false;
                            }
                            break;
                    }
                }

                return true;
            }

            if (arguments.length < 1) {
                throw "Need two or more arguments to compare";
            }

            for (i = 1, l = arguments.length; i < l; i++) {

                leftChain = []; //Todo: this can be cached
                rightChain = [];

                if (!compare2Objects(arguments[0], arguments[i])) {
                  return false;
                }
            }

            return true;
        },
        isEqualWithoutFunction: function(obj, anotherObj) {
            return this.isThis('Object', obj) && this.isThis('Object', anotherObj)
                && JSON.stringify(obj) && JSON.stringify(anotherObj);
        },
        isMatch: function(obj) {

            var properties = Array.prototype.slice.call(arguments, 1);

            for(var key in properties) {
                if(properties.hasOwnProperty(key)) {
                    if(properties[key] !== obj[key]) {
                        return false;
                    }
                }
            }

            return true;
        }
    };
});