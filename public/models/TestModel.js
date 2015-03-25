/**
 * @desc User model
 */
define([
    "app"
], function(app){

    var TestModel = Backbone.Model.extend({

        initialize: function(){
            //_.bindAll(this, 'url');
        },

        defaults: {
            id: 0,
            testid: null,
            mode: null,
            company: null,
            event: null
        },

        url: function(){
            return app.API + '/tests/'+this.id;
        }
    });
    return TestModel;
});

