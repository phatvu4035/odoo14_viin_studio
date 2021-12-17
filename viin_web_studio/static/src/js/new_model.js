odoo.define(('viin_web_studio.NewModel'), function (require) {
    "use strict";

    const Widget = require('web.Widget');
    const core = require('web.core');
    const CommonMenuDialog = require('viin_web_studio.CommonMenuDialog');

    const _t = core._t;

    const NewModelDialog = CommonMenuDialog.extend({
        template: 'viin_web_studio.NewModel.Dialog',
        /**
         * @override
        * */
        init: function (parent, params) {
            this._super.apply(this, arguments);
        }
    });

    return {
        NewModelDialog: NewModelDialog
    }
});