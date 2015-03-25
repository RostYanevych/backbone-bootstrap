/**
 * @desc User model
 */
app.TestModel = Backbone.Model.extend({

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

    urlRoot: app.API + '/tests'
});
