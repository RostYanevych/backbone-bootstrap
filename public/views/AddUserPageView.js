define([
    "app",
    "text!templates/add-user.html",
    "parsley"
], function(app, AddUserPageTpl){

    var AddUserPageView = Backbone.View.extend({

        initialize: function () {
            _.bindAll(this, 'onPasswordKeyup', 'onConfirmPasswordKeyup', 'onSignupAttempt', 'render');
        },

        events: {
            'click #signup-btn'                     : 'onSignupAttempt',
            'keyup #login-password-input'           : 'onPasswordKeyup',
            'keyup #signup-password-confirm-input'  : 'onConfirmPasswordKeyup'
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

        // Allow enter press to trigger signup
        onConfirmPasswordKeyup: function(evt){
            var k = evt.keyCode || evt.which;

            if (k == 13 && $('#confirm-password-input').val() === ''){
                evt.preventDefault();   // prevent enter-press submit when input is empty
            } else if(k == 13){
                evt.preventDefault();
                this.onSignupAttempt();
                return false;
            }
        },

        onSignupAttempt: function(evt){
            if(evt) evt.preventDefault();
            if(this.$("#signup-form").parsley('validate')){
                app.session.signup({
                    username: this.$("#signup-username-input").val(),
                    password: this.$("#signup-password-input").val(),
                    name: this.$("#signup-name-input").val()
                }, {
                    success: function(mod, res){
                        if(DEBUG) console.log("SUCCESS", mod, res);
                    },
                    error: function(err){
                        if(DEBUG) console.log("ERROR", err);
                        app.showAlert('Uh oh!', err.error, 'alert-danger');
                    }
                });
            } else {
                // Invalid clientside validations thru parsley
                if(DEBUG) console.log("Did not pass clientside validation");
            }
        },

        render:function () {
            this.template = _.template(AddUserPageTpl);
            this.$el.html(this.template({ user: app.session.user.toJSON() }));
            return this;
        }
    });

    return AddUserPageView;
});
