odoo.define('viin_web_studio.Menu', function (require) {
    "use strict";

    var Menu = require('web.Menu');
    var core = require('web.core');
    var NewModel = require('viin_web_studio.NewModel');
    var EditMenu = require('viin_web_studio.EditMenu');

    const qweb = core.qweb

    Menu.include({
        events: _.extend({}, Menu.prototype.events, {
            'click .studio-create-app-btn': '_onCreateApp',
            'click .studio-new-model-btn': '_newModel',
            'click .studio-edit-menu-btn': '_editMenu'
        }),
        /**
         * @override
         */
        init: function () {
            this._super.apply(this, arguments);
            core.bus.on('studio_toggled', this, this.switchMode);
        },
        /**
         * Add menu studio when go into studio
        * */
        switchMode: function (e) {
            var $editorNavbar = $(qweb.render('viin_web_studio.EditorNavbar'));
            $editorNavbar.prependTo(this.$el);
        },
        /**
         * Open pop up for App creator
        * */
        _onCreateApp: async function (e) {
            e.preventDefault()
            await this.do_action('studio_app_creator_action');
        },
        /**
        *
        * */
        _newModel: function (ev) {
            var NewModelDialog = NewModel.NewModelDialog;
            ev.preventDefault();
            new NewModelDialog(this, {}).open();
        },
        /**
         * */
        _editMenu: function (ev) {
            ev.preventDefault();
            var EditMenuDialog = EditMenu.EditMenuDialog;
            new EditMenuDialog(this, {}).open();
        }
    })
});