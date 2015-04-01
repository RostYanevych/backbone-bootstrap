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
        event: null,
        state: null,
        updates: null
    },

    urlRoot: app.API + '/tests'
});
