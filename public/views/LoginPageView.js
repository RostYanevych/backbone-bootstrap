define([
    "app",

    "text!templates/logged-in-page.html",
    "text!templates/login-page.html",

    "parsley"
], function(app, LoggedInPageTpl, LoginPageTpl){

    var LoginView = Backbone.View.extend({

        initialize: function () {
            _.bindAll(this, 'onPasswordKeyup', 'onLoginAttempt', 'render');

            // Listen for session logged_in state changes and re-render
            app.session.on("change:logged_in", this.render);
        },

        events: {
            'click #login-btn'                      : 'onLoginAttempt',
            'keyup #login-password-input'           : 'onPasswordKeyup'
        },

        // Allow enter press to trigger login
        onPasswordKeyup: function(evt){
            var k = evt.keyCode || evt.which;

            if (k == 13 && $('#login-password-input').val() === ''){
                evt.preventDefault();    // prevent enter-press submit when input is empty
            } else if(k == 13){
                evt.preventDefault();
                this.onLoginAttempt();
                return false;
            }
        },

        onLoginAttempt: function(evt){
            if(evt) evt.preventDefault();

            if(this.$("#login-form").parsley('validate')){
                app.session.login({
                    username: this.$("#login-username-input").val(),
                    password: this.$("#login-password-input").val()
                }, {
                    success: function(mod, res){
                        if(DEBUG) console.log("SUCCESS", mod, res);

                    },
                    error: function(err){
                        if(DEBUG) console.log("ERROR", err);
                        app.showAlert('Error:', err.error, 'alert-danger'); 
                    }
                });
            } else {
                // Invalid clientside validations thru parsley
                if(DEBUG) console.log("Did not pass clientside validation");

            }
        },
        
        render:function () {
            if(app.session.get('logged_in')) this.template = _.template(LoggedInPageTpl);
            else this.template = _.template(LoginPageTpl); 

            this.$el.html(this.template({ user: app.session.user.toJSON() }));
            return this;
        }

    });

    return LoginView;
});

