var app = {
    root : "/",                     // The root path to run the application through.
    URL : "/",                      // Base application URL
    API : "/api",                   // Base API URL (used by models & collections)
    views: {},
    models: {},

    // Show alert classes and hide after specified timeout
    showAlert: function(title, text, klass) {
        $("#header-alert").removeClass("alert-danger alert-warning alert-success alert-info");
        $("#header-alert").addClass(klass);
        $("#alert-title").html(title);
        $("#alert-text").html(text);
        $("#header-alert").show().addClass('appear');
        if (klass!='alert-danger') //Autohide success notifications, but not errors
            setTimeout(function() { $("#header-alert").removeClass('appear').delay(500).hide(0);}, 7000 ); },

    loadTemplates: function(views, callback) {
console.log('loading views', views);
console.log('app', app);
        var deferreds = [];
        $.each(views, function(index, view) {
            if (app[view]) {
                deferreds.push($.get('templates/' + view + '.html', function(data) {
                    app[view].prototype.template = _.template(data);
                }, 'html'));
            } else {
                alert(view + " not found");
            }
        });

        $.when.apply(null, deferreds).done(callback);
    }
};

app.Router=Backbone.Router.extend({

    initialize: function(){
        _.bindAll(this, 'show','index', 'users', 'userDetails', 'addUser', 'tests', 'testDetails', 'testEdit');
    },

    routes: {
        "" : "index",
        "users": "users",
        "users/:id": "userDetails",
        "add_user": "addUser",
        "tests": "tests",
        "tests/:id": "testDetails",
        "tests/:id/edit": "testEdit"
    },
    // fired before every route.
    //execute: function(callback, args) {
    //  console.log('Route execute: ', callback, args);
    //  args.push(parseQueryString(args.pop()));
    //  if (callback) callback.apply(this, args);
    //},
    show: function(view, options){

        // Every page view in the router should need a header.
        // Instead of creating a base parent view, just assign the view to this
        // so we can create it if it doesn't yet exist
        if(!this.headerView){
            this.headerView = new app.HeaderView({});
            this.headerView.setElement($(".header")).render();
        }

        // Close and unbind any existing page view
        if(this.currentView){
            this.currentView.remove(); //close();
        }

        // Establish the requested view into scope
        this.currentView = view;

        // Need to be authenticated before rendering view.
        // For cases like a user's settings page where we need to double check against the server.
        if (typeof options !== 'undefined' && options.requiresAuth){
            var self = this;
            app.session.checkAuth({
                success: function(res){
                    // If auth successful, render inside the page wrapper
                    $('#content').html( self.currentView.render().$el);
                }, error: function(res){
                    self.navigate("/", { trigger: true, replace: true });
                }
            });

        } else {
            // Render inside the page wrapper
            $('#content').html(this.currentView.render().$el);
            //this.currentView.delegateEvents(this.currentView.events); // Re-delegate events (unbound when closed)
        }
    },

    index: function() {
        // Fix for non-pushState routing (IE9 and below)
        var hasPushState = !!(window.history && history.pushState);
        if(!hasPushState) this.navigate(window.location.pathname.substring(1), {trigger: true, replace: true});
        else this.show(new app.LoginPageView({}));
    },

    users: function() {
        this.show(new app.UsersPageView({}),{requiresAuth: true});
    },

    userDetails: function(id){
        console.debug('userDetails route');
    },

    addUser: function(){
        console.log('Add user route');
        this.show(new app.AddUserPageView({}),{requiresAuth: true});
    },

    tests: function(){
        console.log('Tests route');
        this.show(new app.TestsPageView({}),{requiresAuth: true});
    },

    testDetails: function(id){
        console.log('Test details route for test ', id);
        this.show(new app.TestDetailsPageView(id),{requiresAuth: true});
    },

    testEdit: function(id){
        console.log('Test Edit route for test ', id);
        //this.show(new app.TestEditPageView(id),{requiresAuth: true});
    }
});

$(document).on("ready", function () {
    $.ajaxSetup({ cache: false });          // force ajax call on all browsers
    // Just use GET and POST to support all browsers http://backbonejs.org/#Sync-emulateHTTP
    // Backbone.emulateHTTP = true;

    // Global event aggregator
    app.eventAggregator = _.extend({}, Backbone.Events);

    app.loadTemplates(["HeaderView", "LoginPageView", "TestsPageView", "TestDetailsPageView", "UsersPageView", "AddUserPageView"],
        function () {
            app.router = new app.Router();

            // Create a new session model and scope it to the app global. This will be a singleton, which other modules can access
            app.session = new app.SessionModel({});

            // Check the auth status upon initialization, before rendering anything or matching routes
            app.session.checkAuth({
                // Start the backbone routing once we have captured a user's auth status
                complete: function(){
                    Backbone.history.start();
                }
            });
        });

    //Global events handlers
    $('#wrap').on("click", "a[data-auth-nav]", function(evt) {
        evt.preventDefault();
        var href = $(this).attr("href");
        if(href !== undefined)
            $("#header-alert").hide();
        app.router.navigate(href, { trigger : true, replace : false });
    })
        .on("click", "#alert-hide", function(e){
            $("#header-alert").removeClass('appear').delay(500).hide(0);
        })
    ;

});
