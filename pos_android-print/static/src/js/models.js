odoo.define('pos_custom.pos_custom', function (require) {
    "use strict";
    var models = require('point_of_sale.models');
    var _super_orderline = models.Orderline.prototype;
    models.Orderline = models.Orderline.extend({
        get_display_price: function () {
            var price = _super_orderline.get_display_price.call(this);//old_price
            return price*2;//custom price
        }
    });
});
