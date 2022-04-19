/* global android */
odoo.define("pos_android.ClientScreenButton", function (require) {
    "use strict";

    const ClientScreenButton = require("point_of_sale.ClientScreenButton");
    const Registries = require("point_of_sale.Registries");

    // eslint-disable-next-line no-shadow
    const AndroidClientScreenButton = (ClientScreenButton) =>
        class extends ClientScreenButton {
            constructor() {
                super(...arguments);
                try {
                    this.env.pos.android = android;
                } catch (e) {
                    this.env.pos.android = null;
                }
                this.isAndroidScreenOpened = false;
            }
            onClick() {
                if (this.env.pos.android) {
                    return this.onClickAndroid();
                }
                return super.onClick();
            }
            async onClickAndroid() {
                if (this.isAndroidScreenOpened) {
                    this.env.pos.android.hideDisplay();
                    this.isAndroidScreenOpened = false;
                } else {
                    const renderedHtml = await this.env.pos.render_html_for_customer_facing_display();
                    this.env.pos.android.showDisplay(renderedHtml);
                    this.isAndroidScreenOpened = true;
                }
            }
        };

    Registries.Component.extend(ClientScreenButton, AndroidClientScreenButton);
    return AndroidClientScreenButton;
});
