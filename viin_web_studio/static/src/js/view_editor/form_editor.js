odoo.define('viin_web_studio.FormEditor', function(require) {
    "use strict";
    
    var FormRenderer = require('web.FormRenderer');

    var FormEditor = FormRenderer.extend({
        /**
        * @override
        */
        init: function(parent, state, params) {
            this._super.apply(this, arguments);
        }
        
    });
    return FormEditor
});