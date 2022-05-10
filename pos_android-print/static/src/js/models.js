odoo.define('my_module.dashboard', function(require) {
"use strict";

console.log('dashboard #1');

var dashboard = require('sales_team.dashboard');

console.log('dashboard #2');
var SalesTeamDashboardView = dashboard.include({

    render: function() {
        console.log('dashboard #3');
        var super_render = this._super;
        var self = this;

        return this.fetch_data().then(function(result){
            console.log('dashboard #4');
            self.show_demo = false;

            var sales_dashboard = QWeb.render(template, {
                widget: self,
                show_demo: self.show_demo,
                values: result,
            });
            super_render.call(self);
            console.log('dashboard #5');
            $(sales_dashboard).prependTo(self.$el);
        });
    },
    });

});
