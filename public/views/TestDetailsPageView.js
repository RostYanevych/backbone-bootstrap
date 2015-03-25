define([
    "app",
    "models/TestModel",
    "text!templates/test-details-page.html"
], function(app, TestModel, TestDetailsPageTpl){

    var TestDetailsView = Backbone.View.extend({

        initialize: function (id) {
            _.bindAll(this, 'render');
            console.debug('initialize TestDetailsView', id);
            this.test = new TestModel({id: id});
            this.testFetch = this.test.fetch();
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
            this.template = _.template(TestDetailsPageTpl);
            this.testFetch.done(function(){
                self.$el.html(self.template({ test: self.test.toJSON() }));
            });

            return this;
        }
    });

    return TestDetailsView;
});
