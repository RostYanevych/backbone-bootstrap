app.AddUserPageView = Backbone.View.extend({

    initialize: function () {
        _.bindAll(this, 'onConfirmPasswordKeyup', 'addUser', 'render');
    },

    events: {
        'click #add-btn'                     : 'addUser',
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

    addUser: function(evt){
        var self = this;
        if(evt) evt.preventDefault();
        if(this.$("#signup-form").parsley('validate')){
            var user = new app.UserModel();

            user.save({
                username: this.$("#inputUserName").val(),
                name: this.$("#inputName").val(),
                email: this.$("#inputUserEmail").val(),
                password: this.$("#signup-password-input").val()
            },{
                wait: true,
                success: function(model, response, options){
                    app.showAlert('Success!', 'User created', 'alert-success');
                    self.$("#signup-form")[0].reset();
                    console.log("SUCCESS", model, response);
                },
                error: function(model, response, options){
                    console.log("ERROR: ", model, response, options);
                    app.showAlert('Error:', getErrorMsg(response), 'alert-danger');
                }
            });
        } else {
            // Invalid clientside validations thru parsley
            app.showAlert('Validation failed.', 'Check the messages below', 'alert-warning');
        }
    },

    render:function () {
        //this.template = _.template(AddUserPageTpl);
        this.$el.html(this.template({ user: app.session.user.toJSON() }));
        return this;
    }
});
