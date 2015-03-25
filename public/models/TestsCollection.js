/**
 * @desc Tests collection
 */
app.TestsCollection = Backbone.Collection.extend({
    model: app.TestModel,
    url: app.API + '/tests.json',
    initialize: function(){
        //_.bindAll(this, 'some_model_methods');
    }
});
