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

            var sources = Array.prototype.slice.call(arguments, 1);

            for (var i = 0; i < sources.length; i++) {

                if (this.isThis('Object', dest) && this.isThis('Object', sorurces[i])) {
                    for (var key in sorurces[i]) {
                        dest.key = sorurces[i].key;
                    }
                }
            }

            return dest;
        },
        extendOwn: function(dest) {

            var sources = Array.prototype.slice.call(arguments, 1);

            for (var i = 0; i < sources.length; i++) {

                if (this.isThis('Object', dest) && this.isThis('Object', sorurces[i])) {
                    for (var key in sorurces[i]) {
                        if (sorurces[i].hasOwnProperty(key)) {
                            dest.key = sorurces[i].key;
                        }
                    }
                }
            }

            return dest;
        }
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
                    values.push(obj.key);
                }
            }

            return values;
        },
        mapObject: function(obj, iteratee, context) {

            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    obj.key = iteratee.call(context, obj.key, key);
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
                    if (predicate.call(context, obj.key)) {
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

                    if (obj.hasOwnProperty(key) && predicate(obj.key, key, obj)) {
                        returnObj.key = obj.key;
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
                return obj.key;
            };
        },
        propertyOf: function(key) {
            return function(obj) {
                return obj.key;
            };
        }
    };
});