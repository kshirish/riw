/**
*	`app.js` is just a configuration file which will load 
*	after the `require.js`	
*/

requirejs.config({
    baseUrl: 'lib',
    paths: {
        app: '../app'
    }
});

/**
*	Loading `Foo.js` where all the application logic 
*	will be written
*/
requirejs(['app/Foo']);