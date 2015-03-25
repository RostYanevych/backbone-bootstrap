/**
 * @desc User model
 */

app.UserModel = Backbone.Model.extend({

    initialize: function(){
        //_.bindAll(this, 'url');
    },

    //defaults: {
    //    id: 0,
    //    username: '',
    //    name: '',
    //    email: ''
    //},

    urlRoot: app.API + '/users'

    //url: function(){
    //    return app.API + '/users/'+this.id;
    //}
});
