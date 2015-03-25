/**
 * @desc        app globals
 */
define([
    "jquery",
    "underscore",
    "backbone",
    "bbGrid",
    "backgrid"
],
function($, _, Backbone, bbGrid) {
    var app = {
        root : "/",                     // The root path to run the application through.
        URL : "/",                      // Base application URL
        API : "/api",                   // Base API URL (used by models & collections)

        // Show alert classes and hide after specified timeout
        showAlert: function(title, text, klass) {
            $("#header-alert").removeClass("alert-danger alert-warning alert-success alert-info");
            $("#header-alert").addClass(klass);
            $("#alert-title").html(title);
            $("#alert-text").html(text);
            $("#header-alert").show().addClass('appear');
            if (klass!='alert-danger') //Autohide success notifications, but not errors
              setTimeout(function() { $("#header-alert").removeClass('appear').delay(500).hide(0);}, 7000 ); }
    };

    $.ajaxSetup({ cache: false });          // force ajax call on all browsers

    // Global event aggregator
    app.eventAggregator = _.extend({}, Backbone.Events);
    return app;
});

//$(document).on("ready", function () {
//    app.loadTemplates(["HomeView", "ContactView", "ShellView", "EmployeeView", "EmployeeSummaryView", "EmployeeListItemView"],
//        function () {
//            directory.router = new directory.Router();
//            Backbone.history.start();
//        });
//});
