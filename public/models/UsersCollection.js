/**
 * @desc Users collection
 */
app.UsersCollection = Backbone.Collection.extend({
    model: app.UserModel,
    url: function(){ return app.API + '/users.json'; },
    initialize: function(){
        //_.bindAll(this, 'url');
    }
});
