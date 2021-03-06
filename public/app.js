var app = {
    root : "/",                     // The root path to run the application through.
    URL : "/",                      // Base application URL
    API : "/api",                   // Base API URL (used by models & collections)
    views: {},
    models: {},

    // Show alert classes and hide after specified timeout
    showAlert: function(title, text, klass) {
        if(title==false){ //use showAlert(false); to hide alert message
            $("#header-alert").removeClass('appear').hide();
            return;
        }
        $("#header-alert").removeClass("alert-danger alert-warning alert-success alert-info");
        $("#header-alert").addClass(klass);
        $("#alert-title").html(title);
        $("#alert-text").html(text);
        $("#header-alert").show().addClass('appear');
        if (klass!='alert-danger') //Autohide success notifications, but not errors
            setTimeout(function() { $("#header-alert").removeClass('appear').delay(500).hide(0);}, 7000 );
        return this;
    },

    loadTemplates: function(views, callback) {
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

$(document).on("ready", function () {
    $.ajaxSetup({
        cache: false,
        beforeSend: function(xhr, settings) {
console.log('AJAX before send: ', xhr);
console.log('settings: ', settings);
            if(settings.url.indexOf("/api/") == 0){
console.log('API call. Setting headers');
                var username='someuser';
                var password='somepassword';
                xhr.setRequestHeader('x-my-custom-header', 'some value');
                xhr.setRequestHeader('X-CSRF-TOKEN', 'some token value');
                xhr.setRequestHeader('Authorization', 'Basic ' + btoa(username + ":" + password));
            }
        },
        //headers: {
        //    "Authorization": "Basic " + btoa('USERNAME' + ":" + 'PASSWORD');
        //},
        statusCode: {
            401: function(){
console.log('-------- 401 --------');
                app.showAlert('401','Not Logged In','alert-danger');
                // Redirect to the login page.
                //app.session.set({ logged_in: false, user_id: '', user: new app.UserModel({}) });
                //app.router.navigate('/', { trigger: true });
            },
            403: function() {
console.log('-------- 403 --------');
                // 403 -- Access denied
                //window.location.replace('/#denied');
                app.showAlert('403','Access denied','alert-danger');
            }
        }
    });

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
