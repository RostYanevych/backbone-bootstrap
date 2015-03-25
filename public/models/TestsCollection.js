/**
 * @desc Tests collection
 */
define([
    "app",
    "models/TestModel"
], function(app, TestModel){

    var TestsCollection = Backbone.Collection.extend({
        model: TestModel,
        url: function(){ return app.API + '/tests.json'; },
        initialize: function(){
            //_.bindAll(this, 'url');
        }
    });

    return TestsCollection;
});
