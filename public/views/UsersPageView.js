app.UsersPageView = Backbone.View.extend({

    initialize: function() {
        _.bindAll(this, 'render', 'renderGrid');
        this.users = new app.UsersCollection();
        this.listenTo(this.users, 'reset', function(model, response, options){
            this.renderGrid();
        });

    },

    render: function() {
        this.$el.html(this.template({ user: app.session.user.toJSON() }));
        this.users.fetch({reset: true}); //fetch returns Promise object
        return this;
    },

    renderGrid: function() {
        var columns = [{
            name: "name",
            label: "Name",
            // The cell type can be a reference of a Backgrid.Cell subclass, any Backgrid.Cell subclass instances like *id* above, or a string
            cell: "string" // This is converted to "StringCell" and a corresponding class in the Backgrid package namespace is looked up
        },{
            name: "username",
            label: "Username",
            // The cell type can be a reference of a Backgrid.Cell subclass, any Backgrid.Cell subclass instances like *id* above, or a string
            cell: "string" // This is converted to "StringCell" and a corresponding class in the Backgrid package namespace is looked up
        },{
            name: "email",
            label: "Email",
            cell: "email" // Renders the value in an HTML anchor element
        }];
        var grid = new Backgrid.Grid({
            columns: columns,
            collection: this.users
        });
        $('#users-list-container').empty().html(grid.render().el);
        return this;
    }
});
