odoo.define('viin_web_studio.FormEditor', function(require) {
    "use strict";
    
    var FormRenderer = require('web.FormRenderer');

    var FormEditor = FormRenderer.extend({
        /**
        * @override
        */
        init: function(parent, state, params) {
            this._super.apply(this, arguments);
        },

        /**
         * @override
         */
        _render: function () {
            // When drag new field and this allow field to be drop on form
            this.$el.droppable({
                accept: ".o_web_studio_component",
                drop: this._handleDrop.bind(this),
            });

            return this._super.apply(this, arguments);
        },

        /**
         * @override
         */
        _postProcessField: function(widget, node) {
            this._super.apply(this, arguments);
            this._setVisited(widget.$el)
        },

        /**
        * Set style for field beign visited
        * */
        _setVisited: function ($el) {
            $el.mouseover(function () {
                $(this).closest('tr').addClass('studio-elem-hovered')
            }).mouseout(function () {
                $(this).closest('tr').removeClass('studio-elem-hovered')
            })
        },

        _handleDrop: function () {
            debugger
        }
    });
    return FormEditor
});