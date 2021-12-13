odoo.define('viin_web_studio.EditorRightSidebar', function (require) {
    var Widget = require('web.Widget');

    var EditorRightSidebar = Widget.extend({
        template: 'viin_web_studio.EditorRightSidebar',
        init: function (parent, params) {
            this.fields = params.fields;
        }
    });
    return EditorRightSidebar;
});