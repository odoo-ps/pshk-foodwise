{
    "name": "Pos Android",
    "summary": """Show pos customer screen on Android second screen""",
    "category": "",
    "version": "15.0.1.0.0",
    "author": "Odoo PS",
    "website": "https://www.odoo.com",
    "license": "OEEL-1",
    "depends": ["point_of_sale"],
    "assets": {
        "point_of_sale.assets": [
            "pos_android/static/src/js/models.js",
            "pos_android/static/src/js/ChromeWidgets/ClientScreenButton.js",
        ],
    },
    "odoo_task_ids": [2697632],
}
