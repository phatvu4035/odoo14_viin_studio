odoo.define('viin_web_studio.EditMenu', function (require) {
     "use strict";

    const CommonMenuDialog = require('viin_web_studio.CommonMenuDialog');
    var Widget = require('web.Widget');
    var Dialog = require('web.Dialog');
    var core = require('web.core');
    var _t = core._t;

    var EditMenuDialog = Dialog.extend({
       template: 'viin_web_studio.EditMenu.Dialog',
        init: function (parent, params) {
           var options = {
                title: _t('Edit Menu'),
                dialogClass: 'o_web_studio_edit_menu_dialog',
                buttons: [{
                    text: _t("Confirm"),
                    classes: 'btn-primary',
                }, {
                    text: _t("Cancel"),
                    close: true,
                }, {
                    icon: 'fa-plus-circle',
                    text: _t("New Menu"),
                    classes: 'btn-secondary js_add_menu ml-auto',
                }],
           };
           this._super.apply(this, options)
        }
    });

    return {
        EditMenuDialog: EditMenuDialog
    }
});