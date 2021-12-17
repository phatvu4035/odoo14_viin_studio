odoo.define('viin_web_studio.AppCreator', function (require) {
    "use strict";

    var AbstractAction = require('web.AbstractAction');
    var core = require('web.core');
    const { ComponentAdapter, ComponentWrapper, WidgetAdapterMixin } = require('web.OwlCompatibility');
    const { Component, hooks, useState } = owl;
    const { useExternalListener } = hooks;

    var AppCreatorAction = AbstractAction.extend(WidgetAdapterMixin, {
        /**
         * @override
        */
        init: function (parent, context, options) {
            this._super.apply(this, arguments);
            this.appCreatorComponent = new ComponentWrapper(this, AppCreator, { });
        },

        start: function() {
            var self = this;
            return this._super.apply(this, arguments).then(function () {
                self.appCreatorComponent.mount(self.el)
            })
        },

        destroy: function () {
            WidgetAdapterMixin.destroy.call(this);
            this._super.apply(this, arguments);
        }
    });

    /**
     * App Creator
     * */
    class AppCreator extends Component {
        constructor() {
            super(...arguments);
            this.state = useState({

            })
        }
    }
    AppCreator.template = 'viin_web_studio.AppCreator'

    core.action_registry.add('studio_app_creator_action', AppCreatorAction)
});