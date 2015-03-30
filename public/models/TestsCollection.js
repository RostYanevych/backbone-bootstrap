/**
 * @desc Tests collection
 */
//app.TestsCollection = Backbone.Collection.extend({
app.TestsCollection = Backbone.PageableCollection.extend({
    model: app.TestModel,
    url: app.API + '/tests.json',
// Initial pagination states
    state: {
        pageSize: 5,
        sortKey: "date",
        order: 1,
        period: 'last-week'
    },
    queryParams:{period: 'this_week'},

    initialize: function(){
        //_.bindAll(this, 'fetch', 'setPeriod', 'parseState', 'parseRecords');
    },

    parseState: function (resp, queryParams, state, options) {
console.log('parseState: ', resp, queryParams, state, options);
        return {totalRecords: resp.total_count};
    },

    parseRecords: function (resp, options) {
console.log('parseRecords: ', resp, options);
        return resp.items;
    },

    setPeriod: function(value){
        this.queryParams.period = value;
    },

    zzfetch: function(options) {
        //var self = this;
        //var opts = {
        //    success: function () {
        //        if (options && options.success)
        //            options.success(self);
        //    },
        //    error: function () {
        //        // Allow views to respond to failed fetch calls
        //        self.trigger('fail');
        //        if (options && options.error)
        //            options.error(self);
        //    }
        //};
        //
        //// Combine options and custom handlers, apply to fetch prototype, call.
        //(_.bind(Backbone.Collection.prototype.fetch, this, _.extend({}, options, opts)))();
    }
});
