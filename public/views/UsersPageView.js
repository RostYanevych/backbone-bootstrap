define([
    "app",

    "text!templates/users-page.html"
], function(app, UsersPageTpl){

    var UsersView = Backbone.View.extend({

        initialize: function () {
            _.bindAll(this, 'render');
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
            if(app.session.get('logged_in')) this.template = _.template(UsersPageTpl);
            else this.template = _.template(UsersPageTpl);

            this.$el.html(this.template({ user: app.session.user.toJSON() }));
            return this;
        }

    });

    return UsersView;
});
