app.TestDetailsPageView = Backbone.View.extend({

    initialize: function (id) {
        _.bindAll(this, 'render');
        console.debug('initialize TestDetailsView', id);
        this.test = new app.TestModel({id: id});
        //this.testFetch = this.test.fetch();
        //this.tests = new TestsCollection();
        //here we should load Tests list
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
        console.debug('rendering this.test=', this.test);
        //this.template = _.template(TestDetailsPageTpl);
        this.test.fetch({
            success: function(model, response, options){
                self.$el.html(self.template({ test: self.test }));
            },
            error: function(model, response, options){
                app.showAlert('Error:', app.getErrorMsg(response), 'alert-danger');
                self.$el.html('');
            }
        });

        //.done(function(){ });
        return this;
    }
});
