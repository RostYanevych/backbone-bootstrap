app.UsersPageView = Backbone.View.extend({

    initialize: function () {
        _.bindAll(this, 'render');
        console.debug('initialize UsersView', app.UsersCollection);
        this.users = new app.UsersCollection();
        //here we should load Users list. Or not.
    },

    /*
     events: {
     'click #login-btn'                      : 'onLoginAttempt',
     'click #signup-btn'                     : 'onSignupAttempt',
     'keyup #login-password-input'           : 'onPasswordKeyup',
     'keyup #signup-password-confirm-input'  : 'onConfirmPasswordKeyup'
     },
     */

    render:function () {
        //console.debug('render UsersPageView', this.users.url());
        var self = this;
        //if(app.session.get('logged_in'))
        //this.template = _.template(UsersPageTpl);
        //else
        //    router.navigate('home', {trigger: true});
        //else
        //    this.template = _.template(LoginPageTpl);

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

        //self.users.fetch();
// Backgrid end

        console.log('fetching...');
        var p = self.users.fetch(); //fetch returns Promise object
        console.debug('bbGrid: ',bbGrid);
        console.debug('---Backgrid.Grid: ', Backgrid.Grid);
        p.done(function () {
            console.log('fetched!', self.users.models);

// Initialize a new Grid instance
            var grid = new Backgrid.Grid({
                columns: columns,
                collection: self.users
            });
            console.debug('grid:',grid);
            console.debug('grid render:', grid.render().el);
            $('#users-list-container2').empty().html(grid.render().el);

            var usersGrid = new bbGrid.View({
                container: $('#users-list-container').empty(), //remove "Loading..." text
                //enableSearch: true,
                rows: 5,
                rowList: [5, 25, 50, 100],
                collection: self.users,
                colModel: [//{ title: 'ID', name: 'id', index: true, sorttype: 'number' },
                    { title: 'Username', name: 'username', index: true },
                    { title: 'Name', name: 'name', index: true},
                    { title: 'Email', name: 'email', index: true,
                        //self, self.model.id, self.model.attributes, self.view
                        actions: function(id, attributes, grid){
                            console.debug('actions called for', id, attributes, grid );
                            return self.formatEmail(attributes.email);
                        }
                    } ],
                onReady: function() {
                    $('.bbGrid-grid-nav a', this.$el).removeAttr('href');
                }
            });
        });

        return this;
    },
    formatEmail: function(email){
        if(email){
            var res = '<a href="mailto:' + _.escape(email) + '">' + _.escape(email) + '</a>';
            return(res);
        }
        else
            return('');
    }
});
