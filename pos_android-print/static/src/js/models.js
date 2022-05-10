odoo.define('pult_pos.main2', function (require) {
    "use strict";
    var models = require('point_of_sale.models');

    models.Orderline = models.Orderline.extend({
        get_display_price: function(){
            console.log("custom code ran")
            return this.get_base_price();
            },
        });
});
