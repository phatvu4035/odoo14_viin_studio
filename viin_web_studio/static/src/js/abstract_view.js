odoo.define('viin_web_studio.AbstractViewStudio', function(require) {
    "use strict";
    
    var AbstractView = require('web.AbstractView');
    const ajax = require('web.ajax');
    
    AbstractView.include({
        createStudioView: function(parent, editor, options) {
            return this._createStudioRenderer(parent, editor, options);
        },
        
        _createStudioRenderer: function(parent, Editor, options) {
            var self = this;
            var model = this.getModel(parent);
            
            return Promise.all([this._loadData(model), ajax.loadLibs(this)]).then(function(result) {
                const { state } = result[0];
                
                var editor = new Editor(parent, state, self.rendererParams);
                model.setParent(editor);
                return editor;
            })
            
        }
    });
})