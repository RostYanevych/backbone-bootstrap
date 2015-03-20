/**
 * @desc User model
 */
define([
    "app"
], function(app){

    var UserModel = Backbone.Model.extend({

        initialize: function(){
            //_.bindAll(this, 'url');
        },

        defaults: {
            id: 0,
            username: '',
            name: '',
            email: ''
        },

        url: function(){
            return app.API + '/user';
        }
    });
    return UserModel;
});

