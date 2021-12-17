odoo.define('viin_web_studio.AbstractEditorManager', function(require) {
    "use strict";
    var Widget = require('web.Widget');
    
    var AbstractEditorManager = Widget.extend({
        custom_events: {
            'field_clicked': '_onFieldClicked'
        },
    });
    return AbstractEditorManager;
});