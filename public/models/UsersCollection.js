/**
 * @desc Users collection
 */
app.UsersCollection = Backbone.Collection.extend({
    model: app.UserModel,
    url: app.API + '/users.json',
    initialize: function(){

    }
});
