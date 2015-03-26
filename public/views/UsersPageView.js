app.UsersPageView = Backbone.View.extend({

    initialize: function () {
        _.bindAll(this, 'render');
        this.users = new app.UsersCollection();
    },

    render:function () {
        var self = this;
        this.$el.html(this.template({ user: app.session.user.toJSON() }));

// BackGrid
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
// Backgrid end

        var p = self.users.fetch(); //fetch returns Promise object
        p.done(function () {

// Initialize a new Backgrid.Grid instance
            var grid = new Backgrid.Grid({
                columns: columns,
                collection: self.users
            });

            $('#users-list-container2').empty().html(grid.render().el);

            var usersGrid = new bbGrid.View({
                container: $('#users-list-container').empty(), //remove "Loading..." text
                //enableSearch: true,
                rows: 10,
                rowList: [10, 25, 50, 100],
                collection: self.users,
                colModel: [
                    { title: 'Username', name: 'username', index: true },
                    { title: 'Name', name: 'name', index: true},
                    { title: 'Email', name: 'email', index: true, actions: function(id, attributes, grid){return formatEmail(attributes.email);} } ],
                onReady: function() {
                    $('.bbGrid-grid-nav a', this.$el).removeAttr('href');
                }
            });
        });

        return this;
    }
});
