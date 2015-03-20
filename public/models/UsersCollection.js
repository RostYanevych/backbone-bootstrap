/**
 * @desc Users collection
 */
define([
    "app",
    "models/UserModel"
], function(app, UserModel){

    var UsersCollection = Backbone.Collection.extend({
        model: UserModel,
        url: function(){ return app.API + '/users.json'; },
        initialize: function(){
            //_.bindAll(this, 'url');
        }
    });

    return UsersCollection;
});
