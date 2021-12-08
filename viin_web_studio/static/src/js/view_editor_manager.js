odoo.define('viin_web_studio.ViewEditorManager', function(require) {
    "use strict";
    
    var AbstractEditorManager = require('viin_web_studio.AbstractEditorManager');
    var FormEditor = require('viin_web_studio.FormEditor');
    var viewRegistry = require('web.view_registry');
    var helper = require('viin_web_studio.helper');
    var dom = require('web.dom');
    
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
            // Create editor wrapper 
            var editorFragment = $('<div>', {
                    class: 'o_web_studio_editor_renderer',
            });
            editorFragment.appendTo(this.$el);
            return this._super.apply(this, arguments).then(function() {
                self._instantiateEditor().then(function(editor) {
                    // Append to studio editor
                    var fragment = document.createDocumentFragment();
                    var prom = editor.appendTo(fragment);
                    
                    return prom.then(function() {
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
                modelName: this.modelName
            };
            
            
            this.view = new View(viewInfo, viewParams);
            var editor = editors[this.viewType];
            var def = this.view.createStudioView(this, editor, {});
            
            return def
            
        }
    });
    
    
    
    return ViewEditorManager;
})