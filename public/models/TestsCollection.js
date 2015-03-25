/**
 * @desc Tests collection
 */
app.TestsCollection = Backbone.Collection.extend({
    model: app.TestModel,
    url: function(){ return app.API + '/tests.json'; },
    initialize: function(){
        //_.bindAll(this, 'url');
    }
});
