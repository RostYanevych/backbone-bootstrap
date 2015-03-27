app.TestsPageView = Backbone.View.extend({

    initialize: function () {
        _.bindAll(this, 'render', 'deleteTest');
        this.tests = new app.TestsCollection();
    },

    events: {
        'click button[data-action-delete]': 'deleteTest'
    },

    deleteTest: function(e){
        var self=this;
        if (confirm('Are you sure you want to delete this test?')){
            var el=$(e.target);
            var buttons = el.parents('.bbGrid-actions-cell').find('.btn');
            el.parents('.bbGrid-actions-cell').find('.btn').attr('disabled','disabled'); //disable action buttons
            self.tests.get(el.data('id')).destroy({
                wait: true, // wait for the server to respond before removing the model from the collection. http://backbonejs.org/#Model-destroy
                error: function(model, response, options){
                    el.parents('.bbGrid-actions-cell').find('.btn').removeAttr('disabled'); //enable action buttons
                    app.showAlert('Error:', getErrorMsg(response), 'alert-danger');
                },
                success: function(model, response, options){
                    app.showAlert('Success:', 'Test has been deleted', 'alert-success');
                }
            });
        }
    },

    render:function () {
        var self = this;
        //this.template = _.template(TestsPageTpl);

        this.$el.html(this.template({ user: app.session.user.toJSON() }));

        var columns = [{
            name: "testid",
            label: "Test Case ID",
            // The cell type can be a reference of a Backgrid.Cell subclass, any Backgrid.Cell subclass instances like *id* above, or a string
            cell: "string" // This is converted to "StringCell" and a corresponding class in the Backgrid package namespace is looked up
        },{
            name: "state",
            label: "State",
            // The cell type can be a reference of a Backgrid.Cell subclass, any Backgrid.Cell subclass instances like *id* above, or a string
            cell: "string" // This is converted to "StringCell" and a corresponding class in the Backgrid package namespace is looked up
        },{
            name: "mode",
            label: "Mode",
            // The cell type can be a reference of a Backgrid.Cell subclass, any Backgrid.Cell subclass instances like *id* above, or a string
            cell: "string" // This is converted to "StringCell" and a corresponding class in the Backgrid package namespace is looked up
        },{
            name: "company",
            label: "Company",
            cell: "string" // Renders the value in an HTML anchor element
        },{
            name: "updates",
            label: "Updates",
            cell: "integer"
        },{
            name: "date",
            label: "Date",
            cell: "datetime"
        }
        ];

        var d = self.tests.fetch(); //fetch returns Deferred object

        d.done(function () {
// Initialize a new Grid instance
            var grid = new Backgrid.Grid({
                columns: columns,
                collection: self.tests
            });
            $('#tests-list-container2').empty().html(grid.render().el);

            var testsGrid = new bbGrid.View({
                container: $('#tests-list-container').empty(), //remove "Loading..." text
                //enableSearch: true,
                rows: 5,
                rowList: [5, 25, 50, 100],
                collection: self.tests,
                colModel: [//{ title: 'ID', name: 'id', index: true, sorttype: 'number' },
                    { title: 'Test Case ID', name: 'testid', index: true },
                    { title: 'Mode', name: 'mode', index: true},
                    { title: 'Company', name: 'company', index: true},
                    { title: 'Date', name: 'date', index: true,
                        //self, self.model.id, self.model.attributes, self.view
                        actions: function(id, attributes, grid){
                            //return self.formatDateTime(attributes.date);
                            return self.dateTimeString(attributes.date, true);
                        }
                    },
                    { title: 'Actions', name: 'id',
                        actions: function(id, attributes, grid){
                            return '<a class="btn btn-default btn-xs btn-primary" href="#tests/'+id+'">View</a> \
                                <a class="btn btn-default btn-xs col-md-offset-1" href="#tests/'+id+'/edit">Edit</a> \
                                <button class="btn btn-default btn-xs col-md-offset-1 btn-danger" data-action-delete data-id='+id+'>Delete</button>';
                        }
                    }
                ],
                onReady: function() {
                    $('.bbGrid-grid-nav a', this.$el).removeAttr('href');
                }
            });
        });

        return this;
    },
    formatDateTime: function(value){
        if(value){
            var res = value;
            return(res);
        }
        else
            return('');
    },
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    dateString: function(dt) {
        if ($.type(dt) != "date") dt = new Date(dt);
        return this.months[dt.getMonth()]+' '+dt.getDate()+', '+dt.getFullYear();
    },
    dateTimeString: function(dt, hideSeconds) {
        if ($.type(dt) != "date") dt = new Date(dt);
        var hours = dt.getHours()%12;
        if (hours == 0)
            hours = 12;
        var pm = parseInt(dt.getHours()/12);
        var seconds = dt.getSeconds() < 10 ? "0"+dt.getSeconds() : dt.getSeconds();
        var mins = dt.getMinutes() < 10 ? "0"+dt.getMinutes() : dt.getMinutes();
        var hours = hours < 10 ? "0"+hours : hours;

        str  = this.dateString(dt);
        str += " "+hours;
        str += ":" +mins;
        if (!hideSeconds)
            str += ":" + seconds;
        str += (pm ? 'pm' : 'am');
        return str;
    }
});
