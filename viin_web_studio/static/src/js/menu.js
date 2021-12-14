odoo.define('viin_web_studio.Menu', function (require) {
    "use strict";

    var Menu = require('web.Menu');
    var core = require('web.core');

    const qweb = core.qweb

    Menu.include({
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
        }
    })
});