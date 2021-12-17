odoo.define('viin_web_studio.Menu', function (require) {
    "use strict";

    var Menu = require('web.Menu');
    var core = require('web.core');

    const qweb = core.qweb

    Menu.include({
        events: _.extend({}, Menu.prototype.events, {
            'click .studio-create-app-btn': '_onCreateApp',
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
        }
    })
});