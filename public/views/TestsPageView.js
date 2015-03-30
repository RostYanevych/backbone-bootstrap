/**
 * Tests list page view
 */
app.TestsPageView = Backbone.View.extend({

    initialize: function () {
        _.bindAll(this, 'render', 'deleteTest', 'renderGrid', 'actionsCell');
        this.tests = new app.TestsCollection();
        // listener to errors on tests load. Additional action-specific error hadler are implemented separately. E.g. re-enable buttons on delete failure
        this.listenTo(this.tests, 'error', function(model, response, options){
            console.log('Listened TESTS ERROR!!!!');
            app.showAlert('Error:', getErrorMsg(response), 'alert-danger');
        });
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
                    //enable action buttons. Error message is displayed by global tests collection error listener
                    el.parents('.bbGrid-actions-cell').find('.btn').removeAttr('disabled');
                },
                success: function(model, response, options){
                    app.showAlert('Success:', 'Test has been deleted', 'alert-success');
                }
            });
        }
    },

    render:function () {
        var self = this;

        this.$el.html(this.template({ user: app.session.user.toJSON() }));

        var d = self.tests.fetch({
            reset: true,
            success: function(model, response, options){
                console.log('---fetch success');
                self.renderGrid();
            }
        }); //fetch returns Deferred object

        return this;
    },

    renderGrid: function(){
        var self=this;
        var columns = [{
            name: "testid",
            label: "Test Case ID",
            editable: false,
            // The cell type can be a reference of a Backgrid.Cell subclass, any Backgrid.Cell subclass instances like *id* above, or a string
            cell: "string" // This is converted to "StringCell" and a corresponding class in the Backgrid package namespace is looked up
        },{
            name: "state",
            label: "State",
            editable: false,
            // The cell type can be a reference of a Backgrid.Cell subclass, any Backgrid.Cell subclass instances like *id* above, or a string
            cell: "string" // This is converted to "StringCell" and a corresponding class in the Backgrid package namespace is looked up
        },{
            name: "mode",
            label: "Mode",
            editable: false,
            // The cell type can be a reference of a Backgrid.Cell subclass, any Backgrid.Cell subclass instances like *id* above, or a string
            cell: "string" // This is converted to "StringCell" and a corresponding class in the Backgrid package namespace is looked up
        },{
            name: "company",
            label: "Company",
            editable: false,
            cell: "string" // Renders the value in an HTML anchor element
        },{
            name: "updates",
            label: "Updates",
            editable: false,
            cell: "integer"
        },{
            name: "date",
            label: "Date",
            editable: false,
            cell: "datetime",
            formatter: {
                fromRaw: function(rawValue, model){return dateTimeString(rawValue);}
            }
        },{
            name: "id",
            label: "Actions",
            editable: false,
            cell: self.actionsCell()
        }
        ];

        var grid = new Backgrid.Grid({
            columns: columns,
            collection: self.tests
        });
        $('#tests-list-container').empty().html(grid.render().el);
        var paginator = new Backgrid.Extension.Paginator({

            // If you anticipate a large number of pages, you can adjust
            // the number of page handles to show. The sliding window
            // will automatically show the next set of page handles when
            // you click next at the end of a window.
            windowSize: 20, // Default is 10
            // Used to multiple windowSize to yield a number of pages to slide,
            // in the case the number is 5
            slideScale: 0.25, // Default is 0.5
            // Whether sorting should go back to the first page
            //goBackFirstOnSort: false, // Default is true
            collection: self.tests
        });

        $('#tests-list-container').append(paginator.render().el);
        return this;
    },

    actionsCell: function(){
        return Backgrid.Cell.extend({
            template: _.template('<a class="btn btn-default btn-xs btn-primary" href="#tests/<%=id%>">View</a>' +
            '<a class="btn btn-default btn-xs col-md-offset-1" href="#tests/<%=id%>/edit">Edit</a>' +
            '<button class="btn btn-default btn-xs col-md-offset-1 btn-danger" data-action-delete data-id=<%=id%>>Delete</button>'),
            className: "actions-cell",
            events: {
                //"click button[data-action-delete]": "deleteRow"
            },
            initialize: function () {
                Backgrid.Cell.prototype.initialize.apply(this, arguments);
            },
            //deleteRow: function (e) {
            //    console.log("Delete row", e);
            //    e.preventDefault();
            //    //this.model.collection.remove(this.model);
            //},
            render: function () {
                var rawValue = this.model.get(this.column.get("name"));
                this.$el.html(this.template({ id: rawValue}));
                this.delegateEvents();
                return this;
            }
        });
    }
});
