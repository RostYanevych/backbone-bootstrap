app.TestDetailsPageView = Backbone.View.extend({

    initialize: function (id) {
        _.bindAll(this, 'render');
        this.test = new app.TestModel({id: id});
    },

    /*
     events: {
     'click #login-btn'                      : 'onLoginAttempt',
     'click #signup-btn'                     : 'onSignupAttempt',
     'keyup #login-password-input'           : 'onPasswordKeyup',
     'keyup #signup-password-confirm-input'  : 'onConfirmPasswordKeyup'
     },
     */

    render:function () {
        var self = this;
        this.test.fetch({
            success: function(model, response, options){
                self.$el.html(self.template({ test: self.test }));
            },
            error: function(model, response, options){
                app.showAlert('Error:', getErrorMsg(response), 'alert-danger');
                self.$el.html('');
            }
        });

        return this;
    }
});
