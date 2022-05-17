odoo.define("pos_android.models", function (require) {
    "use strict";

    const models = require("point_of_sale.models");

    const _super_posmodel = models.PosModel.prototype;
    models.PosModel = models.PosModel.extend({
        // eslint-disable-next-line no-unused-vars
        add_new_order: function (options) {
            const order = _super_posmodel.add_new_order.apply(this, arguments);
            this.send_current_order_to_customer_facing_display();
            return order;
        },
        // eslint-disable-next-line no-unused-vars
        set_order: function (order, options) {
            _super_posmodel.set_order.apply(this, arguments);
            this.send_current_order_to_customer_facing_display();
        },
        send_current_order_to_customer_facing_display: function () {
            var self = this;
            this.render_html_for_customer_facing_display().then(function (rendered_html) {
                if (self.env.pos.android) {
                    self.env.pos.android.updateContent(rendered_html);
                } else if (self.env.pos.customer_display) {
                    var $renderedHtml = $("<div>").html(rendered_html);
                    $(self.env.pos.customer_display.document.body).html(
                        $renderedHtml.find(".pos-customer_facing_display")
                    );
                    var orderlines = $(self.env.pos.customer_display.document.body).find(".pos_orderlines_list");
                    orderlines.scrollTop(orderlines.prop("scrollHeight"));
                } else if (self.env.pos.proxy.posbox_supports_display) {
                    self.proxy.update_customer_facing_display(rendered_html);
                }
            });
        },
    });

    const _super_order = models.Order.prototype;
    models.Order = models.Order.extend({
        destroy: function () {
            _super_order.destroy.apply(this, arguments);
            this.pos.send_current_order_to_customer_facing_display();
        },
    });
});
