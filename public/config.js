/**
 * @desc        configure aliases and dependencies
 */

if (typeof DEBUG === 'undefined') DEBUG = true;

require.config({

    baseUrl: '/',

    paths: {
        'jquery'                : 'assets/lib/jquery',
        'underscore'            : 'assets/lib/underscore',         // load lodash instead of underscore (faster + bugfixes)
        'backbone'              : 'assets/lib/backbone',
        'bootstrap'             : 'assets/vendor/bootstrap/js/bootstrap',
        'text'                  : 'assets/lib/text',
        'parsley'               : 'assets/lib/parsley',
        'bbGrid'                : 'assets/lib/bbGrid',
        'backgrid'              : 'assets/lib/backgrid'
    },

    // non-AMD lib
    shim: {
        'underscore'            : { exports  : '_' },
        'backbone'              : { deps : ['underscore', 'jquery'], exports : 'Backbone' },
        'bootstrap'             : { deps : ['jquery'], exports : 'Bootstrap' },
        'parsley'               : { deps: ['jquery'] },
        'bbGrid'                : { deps: ['jquery', 'backbone', 'bootstrap'], exports: 'bbGrid' },
        'backgrid'              : { deps: ['jquery', 'backbone', 'bootstrap'], exports: 'Backgrid' }
    }

});

require(['main']);           // Initialize the application with the main application file.
