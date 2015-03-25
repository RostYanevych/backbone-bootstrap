/**
 * @desc        backbone router
 */

define([
    "app",

    "models/SessionModel",
    "models/UserModel",
    "models/UsersCollection",
    "models/TestModel",
    "models/TestsCollection",


    "views/HeaderView",
    "views/LoginPageView",
    "views/UsersPageView",
    "views/AddUserPageView",
    "views/TestsPageView",
    "views/TestDetailsPageView"
], function(app, SessionModel, UserModel, UsersCollection, TestModel, TestsCollection, HeaderView, LoginPageView, UsersPageView, AddUserPageView, TestsPageView, TestDetailsPageView ){

    var WebRouter = Backbone.Router.extend({

        initialize: function(){
            _.bindAll(this, 'show','index', 'users', 'userDetails', 'addUser', 'tests');
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
                this.headerView = new HeaderView({});
                this.headerView.setElement($(".header")).render();
            }

            // Close and unbind any existing page view
            if(this.currentView){
                console.debug('this.currentView', this.currentView);
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
                //this.currentView.delegateEvents(this.currentView.events);        // Re-delegate events (unbound when closed)
            }
        },

        index: function() {
            // Fix for non-pushState routing (IE9 and below)
            var hasPushState = !!(window.history && history.pushState);
            if(!hasPushState) this.navigate(window.location.pathname.substring(1), {trigger: true, replace: true});
            else this.show(new LoginPageView({}));
        },

        users: function() {
            this.show(new UsersPageView({}),{requiresAuth: true});
        },

        userDetails: function(id){
            console.debug('userDetails route');
        },

        addUser: function(){
            console.log('Add user route');
            this.show(new AddUserPageView({}),{requiresAuth: true});
        },

        tests: function(){
            console.log('Tests route');
            this.show(new TestsPageView({}),{requiresAuth: true});
        },

        testDetails: function(id){
            console.log('Test details route for test ', id);
            this.show(new TestDetailsPageView(id),{requiresAuth: true});
        },

        testEdit: function(id){
            console.log('Test Edit route for test ', id);
            //this.show(new TestEditPageView(id),{requiresAuth: true});
        }
    });

    return WebRouter;
});
