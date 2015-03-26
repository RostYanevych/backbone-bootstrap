app.AddUserPageView = Backbone.View.extend({

    initialize: function () {
        _.bindAll(this, 'onConfirmPasswordKeyup', 'onSignupAttempt', 'render');
    },

    events: {
        'click #signup-btn'                     : 'onSignupAttempt',
        'keyup #signup-password-confirm-input'  : 'onConfirmPasswordKeyup'
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
                username: this.$("#inputUserName").val(),
                name: this.$("#inputName").val(),
                email: this.$("#inputUserEmail").val(),
                password: this.$("#signup-password-input").val()
            }, {
                success: function(mod, res){
                    console.log("SUCCESS", mod, res);
                },
                error: function(err){
                    console.log("ERROR", err);
                    app.showAlert('Uh oh!', err.error, 'alert-danger');
                }
            });
        } else {
            // Invalid clientside validations thru parsley
            console.log("Did not pass clientside validation");
        }
    },

    render:function () {
        //this.template = _.template(AddUserPageTpl);
        this.$el.html(this.template({ user: app.session.user.toJSON() }));
        return this;
    }
});
