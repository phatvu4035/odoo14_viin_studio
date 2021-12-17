odoo.define('viin_web_studio.EditorLeftSidebar', function (require) {
    "use strict";

    var Widget = require('web.Widget');
    var ViewComponent = require('viin_web_studio.view_components');
    var core = require('web.core');
    var _lt = core._lt;
    var _t = core._t;

    var EditorLeftSidebar = Widget.extend({
        template: 'viin_web_studio.EditorLeftSidebar',
        init: function (parent, params) {
            this.fields = params.fields;
            this.fields_in_view = params.fields_in_view;
            this.fields_not_in_view = params.fields_not_in_view;
            this._super.apply(this, arguments);
        },

        start: function () {
            var self = this;
            return this._super.apply(this, arguments).then(function () {
                // Append section to left sidebar
                self._renderNewFieldSection();
                self._renderExistingFieldSection();
            })
        },

        _renderNewFieldSection: function () {
            var newFieldSection = $('<div>', {
                class: 'o_web_studio_new_fields'
            });
            var sectionTitle = $('<h3>', {
                html: _t('New Fields')
            });
            var sidebarContent = this.$('.o_web_studio_left_sidebar_content');
            sidebarContent.append(sectionTitle);
            sidebarContent.append(newFieldSection);
            var defs = [];
            for (let field in ViewComponent.new_field) {
                var FieldComponent = ViewComponent.new_field[field];
                var field_elem =  new FieldComponent(this);
                let prom = field_elem.appendTo(newFieldSection);
                defs.push(prom);
            }
            return defs;
        },

        _renderExistingFieldSection: function () {
            var existingFieldSection = $('<div>', {
                class: 'o_web_studio_existing_fields'
            });
            var sectionTitle = $('<h3>', {
                html: _t('Existing Field')
            });
            var sidebarContent = this.$('.o_web_studio_left_sidebar_content');
            sidebarContent.append(sectionTitle);
            sidebarContent.append(existingFieldSection);
            var ExistingFieldComponent = ViewComponent.existing_field;
            var defs = [];
            for(let field in this.fields_not_in_view) {
                var field_data = this.fields_not_in_view[field];
                var field_elem = new ExistingFieldComponent(this, field_data.string, field, field_data.type, field_data.help || null);
                let prom = field_elem.appendTo(existingFieldSection);
                defs.push(prom);
            }
        }
    });
    return EditorLeftSidebar;
});