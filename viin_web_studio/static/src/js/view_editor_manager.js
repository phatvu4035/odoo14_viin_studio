odoo.define('viin_web_studio.ViewEditorManager', function(require) {
    "use strict";
    
    var AbstractEditorManager = require('viin_web_studio.AbstractEditorManager');
    var FormEditor = require('viin_web_studio.FormEditor');
    var viewRegistry = require('web.view_registry');
    var helper = require('viin_web_studio.helper');
    var dom = require('web.dom');
    var EditorLeftSidebar = require('viin_web_studio.EditorLeftSidebar');
    var EditorRightSidebar = require('viin_web_studio.EditorRightSidebar');

    var editors = {
        'form': FormEditor
    }
    
    var ViewEditorManager = AbstractEditorManager.extend({
        className: 'o_web_studio_editor_manager',
        /**
        * @override
        */
        init: function(parent, params) {
            this.viewType = params.viewType;
            this.fieldViews = params.fieldViews;
            this.action = params.action;
            this.controllerState = params.controllerState;
            this.modelName = params.modelName
            
            return this._super.apply(this, arguments);
        },
        /**
         * @override
         */
        start: function() {
            var self = this;
            var defs = []
            // Create editor fragment
            var editorFragment = $('<div>', {
                    class: 'o_web_studio_editor_renderer',
            });
            editorFragment.appendTo(this.$el);

            return this._super.apply(this, arguments).then(function() {
                self._instantiateEditor().then(function(editor) {
                    var defs = [];
                    var fragment = document.createDocumentFragment();
                    var prom = editor.appendTo(fragment);
                    defs.push(prom)

                    // Load left sidebar
                    self.left_sidebar = self._instantiateEditorLeftSidebar();
                    defs.push(self.left_sidebar.prependTo(self.$el));
                    // Load right sidebar
                    self.right_sidebar = self._instantiateEditorRightSidebar();
                    defs.push(self.right_sidebar.appendTo(self.$el));
                    
                    return Promise.all(defs).then(function() {
                        // Append to studio editor
                        dom.append(self.$('.o_web_studio_editor_renderer'), [fragment], {
                            in_DOM: self.isInDOM,
                        });
                    })
                })
            })
        },
        /*
        * 
        */
        _instantiateEditor: function() {
            var View = viewRegistry.get(this.viewType);
            var viewInfo = {
                arch: this.fieldViews[this.viewType].arch,
                fields: helper.cloneObj(this.fieldViews[this.viewType].fields, true),
                viewFields: helper.cloneObj(this.fieldViews[this.viewType], true)
            }
            var viewParams = {
                action: this.action,
                context: this.action.context,
                controllerState: this.controllerState,
                withSearchPanel: false,
                domain: this.action.domain,
                modelName: this.modelName,
                mode: 'view',
            };

            this.view = new View(viewInfo, viewParams);
            var editor = editors[this.viewType];
            var def = this.view.createStudioView(this, editor, {});
            return def;
        },
        /*
         *
         */
        _instantiateEditorLeftSidebar: function () {
            var params = {
                fields: []
            };
            var def = new EditorLeftSidebar(this, params);
            return def;
        },

        /*
        *
        */
        _instantiateEditorRightSidebar: function () {
            var params = {
                fields: []
            };
            var def = new EditorRightSidebar(this, params);
            return def;
        }
    });
    
    
    
    return ViewEditorManager;
})