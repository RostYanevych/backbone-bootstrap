/**
 * Main app initialization and initial auth check
 */

require([
    "app",
    "router",
    "models/SessionModel"
],
function(app, WebRouter, SessionModel) {

    // Just use GET and POST to support all browsers
    Backbone.emulateHTTP = true;

    app.router = new WebRouter();

    // Create a new session model and scope it to the app global
    // This will be a singleton, which other modules can access
    app.session = new SessionModel({});

    // Check the auth status upon initialization,
    // before rendering anything or matching routes
    app.session.checkAuth({
        // Start the backbone routing once we have captured a user's auth status
        complete: function(){
            Backbone.history.start();
        }
    });

    // All navigation that is relative should be passed through the navigate
    // method, to be processed by the router. If the link has a `data-bypass`
    // attribute, bypass the delegation completely.
/*
    $('#wrap').on("click", "a:not([data-bypass])", function(evt) {
        evt.preventDefault();
        var href = $(this).attr("href");
        if(href !== undefined)
          app.router.navigate(href, { trigger : true, replace : false });
    });
*/

    $('#wrap').on("click", "a[data-auth-nav]", function(evt) {
console.log('auth link clicked');
        evt.preventDefault();
        var href = $(this).attr("href");
        if(href !== undefined)
            app.router.navigate(href, { trigger : true, replace : false });
    });

});

