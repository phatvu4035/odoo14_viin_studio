odoo.define('viin_web_studio.EditorAction', function(require) {
    "use strict";
    
    var AbstractAction = require('web.AbstractAction');
    var core = require('web.core');
    var session = require('web.session');
    var helper = require('viin_web_studio.helper');
    var ViewEditorManager = require('viin_web_studio.ViewEditorManager');
    var dom = require('web.dom');

    const qweb = core.qweb
    
    
    var StudioAction = AbstractAction.extend({
        /**
        * @override
        */   
        init: function (parent, context, options) {
            this._super.apply(this, arguments);
            
            this.options = options;
            this.action = options.action;
            this._setCurrentView(options.viewType);
            this.controllerState = options.controllerState || {};
        },
        
        /**
         * @override
        */
        start: function() {
            var self = this;

            var studioMenu = $('<div>', {
                class: 'o-studio-menu'
            })
            var $editorMenu = this._renderEditorViewTypeMenu();
            var $redoUndoMenu = this._renderRedoUndoMenu();
            var $menuModelMenu = this._openSelectModel();
            $redoUndoMenu.appendTo(studioMenu);
            $menuModelMenu.appendTo(studioMenu);
            $editorMenu.appendTo(studioMenu);
            studioMenu.prependTo(this.$el);

            var def = this._editCurrentView();
            return Promise.all([this._super.apply(this, arguments), def]).then(function() {
                
            });
        },

        /**
         * Create editor menu provide client option when they want to switch to other editor
         * */
        _renderEditorViewTypeMenu: function () {
            var views = this.views.map(v => v[1]);
            var $editorMenu = $(qweb.render('viin_web_studio.EditorViewTypeMenu', {
                views: views
            }));
            return $editorMenu;
        },
        /**
         * Create editor menu provide client option when they want to switch to other editor
         * */
        _renderRedoUndoMenu: function () {
            var $redoUndoMenu = $(qweb.render('viin_web_studio.redoUndoMenu'));
            return $redoUndoMenu;
        },
        /**
        * */
        _openSelectModel: function () {
            var $menuModelMenu = $(qweb.render('viin_web_studio.Select'));
            return $menuModelMenu;
        },
        /**
        * @private
        * set view for current editor action
        *
        */
        _setCurrentView: function(viewType) {
            var views = this.action._views || this.action.views;

            views = views.slice();
            var search_view_id = this.action.search_view_id && this.action.search_view_id[0];
            views.push([search_view_id || false, 'search']);
            this.views = views;
            var current_view = _.find(views, function(view) {
                return view[1] === viewType
            });
            this.view = current_view || this.views[0];
            this.viewType = this.view[1];
            this.viewId = this.view[0];
        },
        _editCurrentView: function() {
            var self = this;
            var defs = [this._loadStudioViewArch(this.action.res_model, this.viewType, this.viewId)];
            if (!this.controllerState.currentId) {
                this.controllerState.currentId = this.controllerState.resIds && self.controllerState.resIds[0];
            }
            
            return Promise.all(defs).then(function() {
                var context = _.extend({}, self.action.context, {lang: false});
                var loadView = self.loadViews(self.action.res_model, context, self.views, {load_filters: true});
                return loadView.then(function(fieldViews) {
                    var params = {
                        action: self.action,
                        viewType: self.viewType,
                        controllerState: self.controllerState,
                        fieldViews: fieldViews,
                        modelName: self.action.res_model
                    };
                    self.view_editor = new ViewEditorManager(self, params);

                    var fragement = document.createDocumentFragment();
                    
                    // Append to dom
                    self.view_editor.appendTo(fragement).then(function() {
                       dom.append(self.$('.o_content'), [fragement], {
                        in_DOM: self.isInDOM,
                       });
                    })
                })
            });
        },
        _loadStudioViewArch: function(model, viewType, viewId) {
            core.bus.trigger('clear_cache');
            var self = this;

            // list is stored as tree in db
            viewType = viewType == 'list' ? 'tree' : viewType;
            
            // set lang to false, because we want to load base language to make sure we can input exactly term
            return this._rpc({
                route: 'viin_studio/get_view_arch',
                params: {
                    model: model,
                    view_type: viewType,
                    view_id: viewId,
                    context: _.extend({}, helper.cloneObj(session.user_context, true), {lang: false})
                }
            }).then(function(studio_view) {
               self.studio_view =  studio_view;
            });
        },
    });
    
    core.action_registry.add('studio_editor_action', StudioAction)
})