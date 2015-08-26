define(function () {

	'use strict';
	
    return {
        events: {}, // usual callbacks
        onceEvents: {}, // callbacks which will be triggered only once
    	on: function(event, callback, context) {
            this.events[event] = this.events[event] || [];
            this.events[event].push(callback.bind(context));
    	},
    	off: function(event, callback, context) {
            
            if (!event) { // remove all the events callbacks

                this.events = {};
                this.onceEvents = {};

            } else if (!callback) { // remove the specific events callbacks

                delete this.events[event];
                delete this.onceEvents[event];

            } else {    // remove the specific callback of an event

                this.events[event] = this.events[event].filter(function(func) {
                    return func.toString() !== callback.toString();
                });

                this.onceEvents[event] = this.onceEvents[event].filter(function(func) {
                    return func.toString() !== callback.toString();
                });
            }
    	}, 
    	trigger: function(event) {

            if(this.events[event] || this.onceEvents[event]) {

                this.events[event].forEach(function(func) {
                    func();
                });

                this.onceEvents[event].forEach(function(func) {
                    func();
                });

            } else {
                throw 'no callbacks registered for this event.';
            }
    	},
    	once: function(event, callback, context) {
            this.onceEvents[event] = this.onceEvents[event] || [];
            this.onceEvents[event].push(callback.bind(context));
    	},
    	listenTo: function(otherObject, event, callback) {
    		otherObject.on(event, callback, this);
    	},
    	stopListening: function(otherObject, event, callback) {
            otherObject.off(event, callback, this);
    	},
    	listenToOnce: function(otherObject, event, callback) {
            otherObject.once(event, callback, this);
    	}
    };
});